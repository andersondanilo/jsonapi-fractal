export default function deserialize (response) {
  const included = response.included || []

  if (Array.isArray(response.data)) {
    return response.data.map((data) => {
      return parseJsonApiSimpleResourceData(data, included, false)
    })
  } else {
    return parseJsonApiSimpleResourceData(response.data, included)
  }
}

function parseJsonApiSimpleResourceData (data, included, useCache = false) {
  if (!included.cached) {
    included.cached = {}
  }

  if (typeof (useCache) === 'undefined') {
    useCache = true
  }

  if (!(data.type in included.cached)) {
    included.cached[data.type] = {}
  }

  if (useCache && data.id in included.cached[data.type]) {
    return included.cached[data.type][data.id]
  }

  const resource = data.attributes
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
            relationData.id
          )

          items.push(item)
        })

        resource[relationName] = items
      } else if (relationRef && relationRef.data) {
        resource[relationName] = findJsonApiIncluded(
          included,
          relationRef.data.type,
          relationRef.data.id
        )
      } else {
        resource[relationName] = null
      }
    }
  }

  return resource
}

function findJsonApiIncluded (included, type, id) {
  let found = null

  included.forEach((item, index) => {
    if (item.type === type && item.id === id) {
      found = parseJsonApiSimpleResourceData(item, included)
    }
  })

  if (!found) {
    found = { id }
  }

  return found
}
