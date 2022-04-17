import { serialize } from '../src'
import { CaseType } from '../src/types'

describe('transform', () => {
  it('do simple transformation', () => {
    const entity = {
      firstName: 'Joe',
      lastName: 'Doe',
      address: {
        id: 'address-1',
      },
      images: [{ id: 'image-1' }, { id: 'image-2' }],
    }

    const serialized = serialize(entity, 'users', {
      relationships: ['address', 'images'],
      changeCase: CaseType.kebabCase,
    })

    expect(serialized).toEqual({
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
})
