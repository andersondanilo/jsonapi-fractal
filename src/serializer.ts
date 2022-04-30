import { Context, ContextBuilder } from './context'
import { DefaultTransformer } from './default-transformer'
import { Transformer } from './transformer'
import {
  Options,
  DocumentObject,
  ResourceObject,
  RelationshipObject,
  NewResourceObject,
  ResourceIdentifierObject,
  SerializeOptions,
} from './types'
import { whitelist, changeCase } from './utils'
import { JsonApiFractalError } from './errors'

type IncludedRecord = Record<string, Record<string, ResourceObject>>

export function transform<TEntity, TExtraOptions = unknown>(): ContextBuilder<TEntity, TExtraOptions> {
  return new ContextBuilder(serializeContext)
}

export function serialize<TEntity, TExtraOptions = unknown>(
  data: TEntity,
  type: string,
  options?: SerializeOptions<TExtraOptions>,
): DocumentObject {
  if (!options) {
    options = {} as SerializeOptions<TExtraOptions>
  }

  return transform()
    .withInput(data)
    .withTransformer(new DefaultTransformer(type, options.relationships || []))
    .withOptions(options)
    .serialize()
}

export function serializeContext<TEntity, TExtraOptions = unknown>(
  context: Context<TEntity, TExtraOptions>,
): DocumentObject {
  if (!context.input) {
    // eslint-disable-next-line unicorn/no-null
    return { data: null }
  }

  const includedByType: IncludedRecord = {}

  const data = Array.isArray(context.input)
    ? context.input.map((entity) => serializeEntity(entity, context.transformer, context.options, includedByType))
    : serializeEntity(context.input, context.transformer, context.options, includedByType)

  const included: ResourceObject[] = []

  for (const type of Object.keys(includedByType)) {
    for (const id of Object.keys(includedByType[type])) {
      included.push(includedByType[type][id])
    }
  }

  return {
    data,
    ...(included.length > 0 ? { included } : {}),
  } as DocumentObject
}

function serializeEntity<TEntity, TExtraOptions>(
  entity: TEntity,
  transformer: Transformer<TEntity, TExtraOptions>,
  options: Options<TExtraOptions>,
  includedByType: IncludedRecord,
): ResourceObject | NewResourceObject {
  let attributes = { ...transformer.transform(entity, options) }
  const idKey = options.idKey || 'id'
  const id: string | undefined =
    (attributes[idKey] as string) || (entity as unknown as Record<string, string>)[idKey] || undefined

  delete attributes[idKey]

  const relationships: Record<string, RelationshipObject> = {}

  for (const relation of Object.keys(transformer.relationships)) {
    const context: Context<unknown, TExtraOptions> = {
      ...transformer.relationships[relation](entity, options),
      options,
    }

    if (Array.isArray(context.input)) {
      relationships[relation] = {
        data: context.input
          .map((inputItem) => serializeRelation({ ...context, input: inputItem }, includedByType))
          .filter((identifier) => !!identifier) as ResourceIdentifierObject[],
      }
    } else if (context.input) {
      relationships[relation] = {
        data: serializeRelation(context, includedByType) as ResourceIdentifierObject,
      }
    }
  }

  if (options.fields && options.fields[transformer.type]) {
    attributes = whitelist(attributes, options.fields[transformer.type])
  }

  if (options.changeCase) {
    attributes = changeCase(attributes, options.changeCase)
  }

  const data: Omit<ResourceObject, 'id'> & { id?: string } = {
    type: transformer.type,
    attributes,
    relationships,
  }

  if (id) {
    data.id = id
  }

  if (data.relationships && Object.keys(data.relationships).length === 0) {
    delete data.relationships
  }

  return data
}

function serializeRelation<TEntity = unknown, TExtraOptions = unknown>(
  context: Context<TEntity, TExtraOptions>,
  includedByType: IncludedRecord,
): ResourceIdentifierObject | undefined {
  const { input: entity, options, transformer, included } = context

  if (!entity) {
    return undefined
  }

  const idKey = options.idKey || 'id'
  const id = (entity as unknown as Record<string, string>)[idKey]

  if (!id) {
    throw new JsonApiFractalError('Resource without id')
  }

  if (included) {
    if (!(transformer.type in includedByType)) {
      includedByType[transformer.type] = {}
    }

    if (!(id in includedByType[transformer.type])) {
      includedByType[transformer.type][id] = serializeEntity(
        entity,
        transformer,
        options,
        includedByType,
      ) as ResourceObject
    }
  }

  return {
    type: transformer.type,
    id,
  }
}
