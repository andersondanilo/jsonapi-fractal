import { camelCase, snakeCase, paramCase } from 'change-case'
import { AttributesObject, CaseType } from './types'

type CaseFunction = (input: string) => string

/**
 * Used to change the case (e.g. captalization) of the keys of a object
 *
 * @param originalAttributes
 * @param caseType
 */
export function changeCase(originalAttributes: AttributesObject, caseType: CaseType): AttributesObject {
  const caseTypes: Record<CaseType, CaseFunction> = {
    [CaseType.camelCase]: camelCase,
    [CaseType.snakeCase]: snakeCase,
    [CaseType.kebabCase]: paramCase,
  }

  const caseFunction = caseTypes[caseType]

  if (!caseFunction) {
    throw new Error('Invalid case type: ' + caseType)
  }

  const parsedAttributes: AttributesObject = {}

  for (const key of Object.keys(originalAttributes)) {
    parsedAttributes[caseFunction(key)] = originalAttributes[key]
  }

  return parsedAttributes
}

/**
 * Keep only a set of fields on a given object
 *
 * @param object
 * @param list
 */
export function whitelist(object: unknown, list: string[]): AttributesObject {
  const result: Record<string, unknown> = {}

  for (const key of list) {
    result[key] = (object as Record<string, unknown>)[key] as unknown
  }

  return result as AttributesObject
}

/**
 * Create record from keys and mapped values
 *
 * @param keys
 * @param getValue
 */
export function createRecordFromKeys<K extends string | number | symbol, V>(
  keys: K[],
  getValue: (key: K) => V,
): Record<K, V> {
  const record: Record<string, V> = {}

  for (const key of keys) {
    record[key as string] = getValue(key)
  }

  return record as Record<K, V>
}
