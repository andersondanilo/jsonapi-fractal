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
      // eslint-disable-next-line unicorn/no-null
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
})
