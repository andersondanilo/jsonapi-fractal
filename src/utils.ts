import { camelCase, snakeCase, paramCase } from 'change-case'

export function changeCase (attributes, caseType, deep = false) {
  const caseTypes = {
    camelCase,
    snakeCase,
    paramCase,
    kebabCase: paramCase
  }

  const caseFn = caseTypes[caseType]

  if (!caseFn) {
    throw new Error('Invalid case type: ' + caseType)
  }

  const newAttributes = {}

  for (const key of Object.keys(attributes)) {
    if (
      deep &&
      Object.prototype.toString.call(attributes[key]) === '[object Object]'
    ) {
      newAttributes[caseFn(key)] = changeCase(attributes[key], caseType, deep)
    } else {
      newAttributes[caseFn(key)] = attributes[key]
    }
  }

  return newAttributes
}

export function whitelist (obj, list) {
  const result = {}

  for (const key of list) {
    result[key] = obj[key]
  }

  return result
}
