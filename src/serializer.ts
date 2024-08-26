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
import { whitelist, changeCase, caseTypes } from './utils'
import { JsonApiFractalError } from './errors'

type IncludedRecord = Record<string, Record<string, ResourceObject>>

/**
 * Create a ContextBuilder, used to configure the transformation
 */
export function transform<TEntity, TExtraOptions = unknown>(): ContextBuilder<TEntity, TExtraOptions> {
  return new ContextBuilder(serializeContext)
}

/**
 * Serialize the entity
 *
 * @param data entity to be serialized
 * @param type type of the entity
 * @param options options used in the serialization
 */
export function serialize<TEntity, TExtraOptions = unknown>(
  data: TEntity,
  type: string,
  options?: SerializeOptions<TExtraOptions>,
): DocumentObject {
  if (!options) {
    options = {} as SerializeOptions<TExtraOptions>
  }

  if (options.typeKey) {
    if (options.idKey === options.typeKey) {
      throw new JsonApiFractalError('idKey and typeKey must be different')
    }
    const typeFromTypeKey = (data as any)[options.typeKey]
    if (typeFromTypeKey && typeFromTypeKey !== type) {
      throw new JsonApiFractalError('typeKey and type must be the same')
    }
  }

  return transform()
    .withInput(data)
    .withTransformer(new DefaultTransformer(type, options.relationships || []))
    .withOptions(options)
    .withIncluded(options.included ?? false)
    .serialize()
}

function serializeContext<TEntity, TExtraOptions = unknown>(context: Context<TEntity, TExtraOptions>): DocumentObject {
  if (!context.input) {
    // eslint-disable-next-line unicorn/no-null
    return { data: null }
  }

  const includedByType: IncludedRecord = {}

  const data = Array.isArray(context.input)
    ? context.input.map((entity) =>
        serializeEntity(entity, context.transformer, context.included, context.options, includedByType),
      )
    : serializeEntity(context.input, context.transformer, context.included, context.options, includedByType)

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
  included: boolean,
  options: Options<TExtraOptions>,
  includedByType: IncludedRecord,
): ResourceObject | NewResourceObject {
  let attributes = { ...transformer.transform(entity, options) }
  const idKey = options.idKey || 'id'
  const baseKey = options.typeKey;
  const id: string | undefined =
    (attributes[idKey] as string) || (entity as unknown as Record<string, string>)[idKey] || undefined

  delete attributes[idKey]
  if (baseKey) {
    delete attributes[baseKey]
  }

  const relationships: Record<string, RelationshipObject> = {}

  for (const relation of Object.keys(transformer.relationships)) {
    const relationshipContext = transformer.relationships[relation](entity, options)
    const context: Context<unknown, TExtraOptions> = {
      input: relationshipContext.input,
      transformer: relationshipContext.transformer,
      included: relationshipContext.included || included,
      options,
    }

    let casedRelation = relation
    if (options.changeCase) {
      casedRelation = caseTypes[options.changeCase](relation)
    }

    if (Array.isArray(context.input)) {
      relationships[casedRelation] = {
        data: context.input
          .map((inputItem) => serializeRelation({ ...context, input: inputItem }, includedByType))
          .filter((identifier) => !!identifier) as ResourceIdentifierObject[],
      }
    } else if (context.input) {
      relationships[casedRelation] = {
        data: serializeRelation(context, includedByType) as ResourceIdentifierObject,
      }
    }
  }

  if (options.fields && options.fields[transformer.type]) {
    attributes = whitelist(attributes, options.fields[transformer.type])
  }

  if (options.changeCase) {
    attributes = changeCase(attributes, options.changeCase, options.changeCaseDeep)
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
        included,
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
