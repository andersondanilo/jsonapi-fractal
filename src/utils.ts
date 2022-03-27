import { camelCase, snakeCase, paramCase } from 'change-case'

export function changeCase(attributes, caseType) {
  const caseTypes = {
    camelCase,
    snakeCase,
    paramCase,
    kebabCase: paramCase,
  }

  const caseFn = caseTypes[caseType]

  if (!caseFn) {
    throw new Error('Invalid case type: ' + caseType)
  }

  const newAttributes = {}

  for (const key of Object.keys(attributes)) {
    newAttributes[caseFn(key)] = attributes[key]
  }

  return newAttributes
}

export function whitelist(obj, list) {
  const result = {}

  for (const key of list) {
    result[key] = obj[key]
  }

  return result
}
