import { changeCase } from '../src/utils'
import { AttributesObject, CaseType, KeyTransformPolicy } from '../src/types'

describe('changeCase', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any

  beforeEach(() => {
    input = {
      firstName: 'Joe',
      lastName: 'Doe',
      address: {
        streetNumber: 5,
      },
      images: [
        {
          maxWidth: 5,
        },
      ],
    }
  })

  it('should deep convert keys', () => {
    expect(changeCase(input, CaseType.kebabCase, true)).toStrictEqual({
      'first-name': 'Joe',
      'last-name': 'Doe',
      address: {
        'street-number': 5,
      },
      images: [
        {
          'max-width': 5,
        },
      ],
    })
  })

  it('should remove underscores before numbers in camelCase', () => {
    const snakeInput = {
      first_name: 'Joe',
      last_name: 'Doe',
      address_1: {
        line_1: '543 Street',
      },
    }
    expect(changeCase(snakeInput, CaseType.camelCase, true)).toStrictEqual({
      firstName: 'Joe',
      lastName: 'Doe',
      address1: {
        line1: '543 Street',
      },
    })
  })

  it('should selectively preserve dynamic keys and opaque values', () => {
    const dynamicInput = JSON.parse(`{
      "declared_object": {
        "known_field": { "nested_field": true },
        "Custom-Key": { "Nested_Key": "unchanged" },
        "__proto__": { "Nested_Key": "unchanged" }
      }
    }`) as AttributesObject
    const policy: KeyTransformPolicy = {
      knownKeys: {
        declared_object: {
          knownKeys: {
            known_field: {},
          },
          unknownKeys: {
            valuePolicy: 'preserve',
          },
        },
      },
    }

    const result = changeCase(dynamicInput, CaseType.camelCase, true, policy)
    const declaredObject = result.declaredObject as AttributesObject

    expect(declaredObject.knownField).toStrictEqual({ nestedField: true })
    expect(declaredObject['Custom-Key']).toStrictEqual({ Nested_Key: 'unchanged' })
    expect(Object.getPrototypeOf(declaredObject)).toBe(Object.prototype)
    expect(Object.getOwnPropertyDescriptor(declaredObject, '__proto__')?.value).toStrictEqual({
      Nested_Key: 'unchanged',
    })
  })

  it('should apply output-cased policies to objects in arrays', () => {
    const policy: KeyTransformPolicy = {
      knownKeys: {
        item_list: {
          knownKeys: {
            metadata_map: {
              unknownKeys: {},
            },
          },
        },
      },
    }

    expect(
      changeCase(
        {
          itemList: [
            {
              metadataMap: {
                'X-Header': { headerValue: 'converted' },
              },
              declaredField: 'converted',
            },
          ],
        },
        CaseType.snakeCase,
        true,
        policy,
        'output',
      ),
    ).toStrictEqual({
      item_list: [
        {
          metadata_map: {
            'X-Header': { header_value: 'converted' },
          },
          declared_field: 'converted',
        },
      ],
    })
  })
})
