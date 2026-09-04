import { camelCase, snakeCase, paramCase, camelCaseTransformMerge } from 'change-case'
import { AttributesObject, CaseType, JsonObject, KeyTransformPolicy } from './types'

type CaseFunction = (input: string) => string
type PolicyKeyCase = 'input' | 'output'

export const caseTypes: Record<CaseType, CaseFunction> = {
  [CaseType.camelCase]: (input: string) => camelCase(input, { transform: camelCaseTransformMerge }),
  [CaseType.snakeCase]: snakeCase,
  [CaseType.kebabCase]: paramCase,
}

/**
 * Used to change the case (e.g. captalization) of the keys of a object
 *
 * @param originalAttributes
 * @param caseType
 * @param deep
 * @param keyTransformPolicy
 * @param policyKeyCase whether policy keys match input or output casing
 */
export function changeCase(
  originalAttributes: AttributesObject,
  caseType: CaseType,
  deep = false,
  keyTransformPolicy?: KeyTransformPolicy,
  policyKeyCase: PolicyKeyCase = 'input',
): AttributesObject {
  if (keyTransformPolicy === 'preserve') {
    return originalAttributes
  }

  const caseFunction = caseTypes[caseType]

  if (!caseFunction) {
    throw new Error('Invalid case type: ' + caseType)
  }

  const parsedAttributes: AttributesObject = {}

  for (const key of Object.keys(originalAttributes)) {
    const transformedKey = caseFunction(key)
    const policyKey = policyKeyCase === 'input' ? key : transformedKey
    const knownKeys = keyTransformPolicy?.knownKeys
    const hasKnownKey = !!knownKeys && Object.prototype.hasOwnProperty.call(knownKeys, policyKey)
    const unknownKeys = keyTransformPolicy?.unknownKeys
    const preserveUnknownKey = !hasKnownKey && unknownKeys !== undefined
    const nestedPolicy = hasKnownKey ? knownKeys[policyKey] : unknownKeys?.valuePolicy
    let value = originalAttributes[key]

    if (deep && value) {
      if (Array.isArray(value)) {
        value = value.map((value) =>
          isObject(value) ? changeCase(value as JsonObject, caseType, deep, nestedPolicy, policyKeyCase) : value,
        )
      } else if (isObject(value)) {
        value = changeCase(value as JsonObject, caseType, deep, nestedPolicy, policyKeyCase)
      }
    }

    Object.defineProperty(parsedAttributes, preserveUnknownKey ? key : transformedKey, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
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
