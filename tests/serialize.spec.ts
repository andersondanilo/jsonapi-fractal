import { serialize } from '../src'
import { CaseType, SerializeOptions } from '../src/types'

describe('serialize', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let validEntity: any
  let validOptions: SerializeOptions

  beforeEach(() => {
    validEntity = {
      firstName: 'Joe',
      lastName: 'Doe',
      address: {
        id: 'address-1',
      },
      images: [
        { id: 'image-1', name: 'myimage1', width: 100 },
        { id: 'image-2', name: 'myimage2', width: 100 },
      ],
    }

    validOptions = {
      relationships: ['address', 'images'],
      changeCase: CaseType.kebabCase,
    }
  })

  it('should do simple transformation', () => {
    const serialized = serialize(validEntity, 'users', validOptions)

    expect(serialized).toStrictEqual({
      data: {
        type: 'users',
        attributes: {
          'first-name': 'Joe',
          'last-name': 'Doe',
        },
        relationships: {
          address: {
            data: {
              type: 'address',
              id: 'address-1',
            },
          },
          images: {
            data: [
              { type: 'images', id: 'image-1' },
              { type: 'images', id: 'image-2' },
            ],
          },
        },
      },
    })
  })

  it('should accept undefined options', () => {
    const serialized = serialize(validEntity, 'users')

    expect(serialized).toStrictEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          attributes: expect.objectContaining({
            firstName: 'Joe',
          }),
        }),
      }),
    )
  })

  it('should accept empty entity', () => {
    const serialized = serialize(undefined, 'users')

    expect(serialized).toStrictEqual({
      data: null,
    })
  })

  it('should accept entity array', () => {
    const serialized = serialize([validEntity], 'users')

    expect(serialized).toStrictEqual(
      expect.objectContaining({
        data: [
          expect.objectContaining({
            attributes: expect.objectContaining({
              firstName: 'Joe',
            }),
          }),
        ],
      }),
    )
  })

  it('should accept fields filter', () => {
    const serialized = serialize({ id: 5, ...validEntity }, 'users', {
      fields: {
        users: ['firstName'],
      },
    })

    expect(serialized).toStrictEqual({
      data: {
        id: 5,
        type: 'users',
        attributes: {
          firstName: 'Joe',
        },
      },
    })
  })

  it('should set relationship types appropriately', () => {
    const serialized = serialize(validEntity, 'users', {
      relationships: { address: 'locations' },
    })

    expect(serialized).toStrictEqual({
      data: {
        type: 'users',
        attributes: {
          firstName: 'Joe',
          lastName: 'Doe',
          images: [
            { id: 'image-1', name: 'myimage1', width: 100 },
            { id: 'image-2', name: 'myimage2', width: 100 },
          ],
        },
        relationships: {
          address: {
            data: {
              type: 'locations',
              id: 'address-1',
            },
          },
        },
      },
    })
  })

  it('should change relationship name casing', () => {
    const serialized = serialize(
      {
        firstName: 'Joe',
        lastName: 'Doe',
        homeAddress: {
          id: 'address-1',
        },
      },
      'users',
      { relationships: ['homeAddress'], changeCase: CaseType.snakeCase },
    )

    expect(serialized).toStrictEqual({
      data: {
        type: 'users',
        attributes: {
          first_name: 'Joe',
          last_name: 'Doe',
        },
        relationships: {
          home_address: {
            data: {
              type: 'homeAddress',
              id: 'address-1',
            },
          },
        },
      },
    })
  })

  it('should serialize included when configured', () => {
    const serialized = serialize(validEntity, 'users', {
      relationships: { images: 'image_assets' },
      included: true,
    })

    expect(serialized).toStrictEqual({
      data: {
        type: 'users',
        attributes: {
          address: {
            id: 'address-1',
          },
          firstName: 'Joe',
          lastName: 'Doe',
        },
        relationships: {
          images: {
            data: [
              {
                id: 'image-1',
                type: 'image_assets',
              },
              {
                id: 'image-2',
                type: 'image_assets',
              },
            ],
          },
        },
      },
      included: [
        {
          id: 'image-1',
          type: 'image_assets',
          attributes: {
            name: 'myimage1',
            width: 100,
          },
        },
        {
          id: 'image-2',
          type: 'image_assets',
          attributes: {
            name: 'myimage2',
            width: 100,
          },
        },
      ],
    })
  })

  it('should selectively preserve dynamic keys by resource type', () => {
    const serialized = serialize(
      {
        id: '1',
        createdAt: '2026-09-04',
        metadata: {
          knownField: { nestedField: 'transformed' },
          'X-Header': { Header_Value: 'unchanged' },
        },
      },
      'users',
      {
        changeCase: CaseType.snakeCase,
        changeCaseDeep: true,
        keyTransformPoliciesByResourceType: {
          users: {
            knownKeys: {
              metadata: {
                knownKeys: {
                  known_field: {},
                },
                unknownKeys: {
                  valuePolicy: 'preserve',
                },
              },
            },
          },
        },
      },
    )

    expect(serialized).toStrictEqual({
      data: {
        id: '1',
        type: 'users',
        attributes: {
          created_at: '2026-09-04',
          metadata: {
            known_field: { nested_field: 'transformed' },
            'X-Header': { Header_Value: 'unchanged' },
          },
        },
      },
    })
  })
})
