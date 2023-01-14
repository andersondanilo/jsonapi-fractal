import { camelCase, snakeCase, paramCase } from 'change-case'
import { AttributesObject, CaseType, JsonObject } from './types'

type CaseFunction = (input: string) => string
export const caseTypes: Record<CaseType, CaseFunction> = {
  [CaseType.camelCase]: camelCase,
  [CaseType.snakeCase]: snakeCase,
  [CaseType.kebabCase]: paramCase,
}

/**
 * Used to change the case (e.g. captalization) of the keys of a object
 *
 * @param originalAttributes
 * @param caseType
 * @param deep
 */
export function changeCase(originalAttributes: AttributesObject, caseType: CaseType, deep = false): AttributesObject {
  const caseFunction = caseTypes[caseType]

  if (!caseFunction) {
    throw new Error('Invalid case type: ' + caseType)
  }

  const parsedAttributes: AttributesObject = {}

  for (const key of Object.keys(originalAttributes)) {
    let value = originalAttributes[key]

    if (deep && value) {
      if (Array.isArray(value)) {
        value = value.map((value) => (isObject(value) ? changeCase(value as JsonObject, caseType, deep) : value))
      } else if (isObject(value)) {
        value = changeCase(value as JsonObject, caseType, deep)
      }
    }

    parsedAttributes[caseFunction(key)] = value
  }

  return parsedAttributes
}

function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) == '[object Object]'
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
