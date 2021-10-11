import { changeCase } from './utils'

export default function deserialize (response, options = {}) {
  if (!options) {
    options = {}
  }

  const included = response.included || []

  if (Array.isArray(response.data)) {
    return response.data.map((data) => {
      return parseJsonApiSimpleResourceData(data, included, false, options)
    })
  } else {
    return parseJsonApiSimpleResourceData(response.data, included, false, options)
  }
}

function parseJsonApiSimpleResourceData (data, included, useCache, options) {
  if (!included.cached) {
    included.cached = {}
  }

  if (!(data.type in included.cached)) {
    included.cached[data.type] = {}
  }

  if (useCache && data.id in included.cached[data.type]) {
    return included.cached[data.type][data.id]
  }

  let attributes = data.attributes || {}

  if (options.changeCase) {
    attributes = changeCase(attributes, options.changeCase, options.deep)
  }

  const resource = attributes
  resource.id = data.id

  included.cached[data.type][data.id] = resource

  if (data.relationships) {
    for (const relationName of Object.keys(data.relationships)) {
      const relationRef = data.relationships[relationName]

      if (Array.isArray(relationRef.data)) {
        const items = []

        relationRef.data.forEach((relationData, index) => {
          const item = findJsonApiIncluded(
            included,
            relationData.type,
            relationData.id,
            options
          )

          items.push(item)
        })

        resource[relationName] = items
      } else if (relationRef && relationRef.data) {
        resource[relationName] = findJsonApiIncluded(
          included,
          relationRef.data.type,
          relationRef.data.id,
          options
        )
      } else {
        resource[relationName] = null
      }
    }
  }

  return resource
}

function findJsonApiIncluded (included, type, id, options) {
  let found = null

  included.forEach((item, index) => {
    if (item.type === type && item.id === id) {
      found = parseJsonApiSimpleResourceData(item, included, true, options)
    }
  })

  if (!found) {
    found = { id }
  }

  return found
}
