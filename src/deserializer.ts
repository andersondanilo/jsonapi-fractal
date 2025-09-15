import { AttributesObject, DocumentObject, ExistingResourceObject, Options, ResourceObject } from './types'
import { caseTypes, changeCase } from './utils'

type IncludedCache = Record<string, Record<string, unknown>>
type IncludedMap = Record<string, Record<string, ExistingResourceObject>>

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
  const includedMap: IncludedMap = {}
  for (const include of included) {
    includedMap[include.type] ??= {}
    includedMap[include.type][include.id] = include
  }

  return Array.isArray(response.data)
    ? response.data.map((data) => {
        return parseJsonApiSimpleResourceData(data, includedMap, options, false, {})
      })
    : parseJsonApiSimpleResourceData(response.data, includedMap, options, false, {})
}

function parseJsonApiSimpleResourceData<TEntity, TExtraOptions>(
  data: ResourceObject,
  includedMap: IncludedMap,
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
    attributes = changeCase(attributes, options.changeCase, options.changeCaseDeep)
  }

  const resource: Record<string, unknown> = {
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
          return findJsonApiIncluded(includedMap, includedCache, relationData.type, relationData.id, options)
        })
      } else if (relationReference && relationReference.data) {
        const relationResource = findJsonApiIncluded<Record<string, unknown>, TExtraOptions>(
          includedMap,
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
 * @param includedMap
 * @param includedCache
 * @param type
 * @param id
 * @param options
 */
function findJsonApiIncluded<TEntity, TExtraOptions>(
  includedMap: IncludedMap,
  includedCache: IncludedCache,
  type: string,
  id: string,
  options: Options<TExtraOptions>,
): TEntity {
  const foundResource = includedMap[type]?.[id]

  if (!foundResource) {
    return { id } as unknown as TEntity
  }

  return parseJsonApiSimpleResourceData(foundResource, includedMap, options, true, includedCache)
}
