import { AttributesObject, DocumentObject, ExistingResourceObject, Options, ResourceObject } from './types'
import { changeCase } from './utils'

type IncludedCache = Record<string, Record<string, unknown>>

/**
 * Deserialize a JSON:API response
 *
 * @param response
 * @param options
 */
export function deserialize<TEntity, TExtraOptions = unknown>(
  response: DocumentObject,
  options: Options<TExtraOptions> = {},
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

function parseJsonApiSimpleResourceData<TEntity, TExtraOptions>(
  data: ResourceObject,
  included: ExistingResourceObject[],
  options: Options<TExtraOptions>,
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
    attributes = changeCase(attributes, options.changeCase)
  }

  const resource: Record<string, unknown> = {
    ...(id ? { id } : {}),
    ...attributes,
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

      if (Array.isArray(relationReference.data)) {
        resource[relationName] = relationReference.data.map((relationData) => {
          return findJsonApiIncluded(included, includedCache, relationData.type, relationData.id, options)
        })
      } else if (relationReference && relationReference.data) {
        resource[relationName] = findJsonApiIncluded(
          included,
          includedCache,
          relationReference.data.type,
          relationReference.data.id,
          options,
        )
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
  options: Options<TExtraOptions>,
): TEntity {
  const foundResource = included.find((item) => item.type === type && item.id === id)

  if (!foundResource) {
    return { id } as unknown as TEntity
  }

  return parseJsonApiSimpleResourceData(foundResource, included, options, true, includedCache)
}
