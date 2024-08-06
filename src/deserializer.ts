import { AttributesObject, DocumentObject, ExistingResourceObject, DeserializeOptions, ResourceObject } from './types'
import { caseTypes, changeCase } from './utils'

type IncludedCache = Record<string, Record<string, unknown>>

/**
 * Deserialize a JSON:API response
 *
 * @param response
 * @param options
 */
export function deserialize<TEntity, TExtraOptions = unknown>(
  response: DocumentObject,
  options: DeserializeOptions<TExtraOptions> = {},
): TEntity | TEntity[] | undefined {
  if (!response.data) {
    return undefined
  }

  const included = response.included || []

  return Array.isArray(response.data)
    ? response.data.map((data) => {
        return parseJsonApiSimpleResourceData(data, included, options, false, {})
      })
    : parseJsonApiSimpleResourceData(response.data, included, options, false, {})
}

export const typeField = Symbol('type')

function parseJsonApiSimpleResourceData<TEntity, TExtraOptions>(
  data: ResourceObject,
  included: ExistingResourceObject[],
  options: DeserializeOptions<TExtraOptions>,
  useCache: boolean,
  includedCache: IncludedCache,
): TEntity {
  if (!(data.type in includedCache)) {
    includedCache[data.type] = {}
  }

  const id: string | undefined = (data as ExistingResourceObject).id || undefined

  if (useCache && id && id in includedCache[data.type]) {
    return includedCache[data.type][id] as TEntity
  }

  let attributes: AttributesObject = data.attributes || {}

  if (options.changeCase) {
    attributes = changeCase(attributes, options.changeCase, options.changeCaseDeep)
  }

  const resource: Record<string, unknown> = {
    ...(options.injectType ? { [typeField]: data.type } : {}),
    ...(id ? { id } : {}),
    ...attributes,
  }

  if (data.links) {
    resource['links'] = data.links
  }

  if (id) {
    includedCache[data.type][id] = resource
  }

  if (data.relationships) {
    for (const relationName of Object.keys(data.relationships)) {
      const relationReference = data.relationships[relationName]

      if (!relationReference) {
        continue
      }

      let casedRelationName = relationName
      if (options.changeCase) {
        casedRelationName = caseTypes[options.changeCase](relationName)
      }

      if (Array.isArray(relationReference.data)) {
        resource[casedRelationName] = relationReference.data.map((relationData) => {
          return findJsonApiIncluded(included, includedCache, relationData.type, relationData.id, options)
        })
      } else if (relationReference && relationReference.data) {
        const relationResource = findJsonApiIncluded<Record<string, unknown>, TExtraOptions>(
          included,
          includedCache,
          relationReference.data.type,
          relationReference.data.id,
          options,
        )

        if (relationReference.links) {
          relationResource.links = relationReference.links
        }

        resource[casedRelationName] = relationResource
      }
    }
  }

  return resource as TEntity
}

/**
 *
 * @param included
 * @param includedCache
 * @param type
 * @param id
 * @param options
 */
function findJsonApiIncluded<TEntity, TExtraOptions>(
  included: ExistingResourceObject[],
  includedCache: IncludedCache,
  type: string,
  id: string,
  options: DeserializeOptions<TExtraOptions>,
): TEntity {
  const foundResource = included.find((item) => item.type === type && item.id === id)

  if (!foundResource) {
    return { id, ...(options.injectType ? { [typeField]: type } : {}), } as unknown as TEntity
  }

  return parseJsonApiSimpleResourceData(foundResource, included, options, true, includedCache)
}
