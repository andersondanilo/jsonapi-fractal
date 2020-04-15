import { serialize } from '../src/index'

describe('transform', () => {
  it('Do simple transformation', () => {
    const entity = {
      firstName: "Joe",
      lastName: "Doe",
      address: {
        id: 1
      },
      images: [
        1,
        { id: 2 }
      ]
    };

    const serialized = serialize(entity, 'users', {
      relationships: ['address', 'images'],
      changeCase: 'kebabCase'
    });

    expect(serialized).toEqual({
      data: {
        type: "users",
        attributes: {
          'first-name': 'Joe',
          'last-name': 'Doe'
        },
        relationships: {
          address: {
            data: {
              type: 'address',
              id: 1
            }
          },
          images: {
            data: [
              { type: 'images', id: 1 },
              { type: 'images', id: 2 }
            ]
          }
        }
      }
    })
  })
});
