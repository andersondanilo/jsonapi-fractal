import { deserialize } from '../src/index'

describe('deserialize', () => {
  it('Complex serialize', () => {
    const serialized = {
      data: [
        {
          type: 'users',
          id: 1,
          attributes: {
            firstName: 'Joe',
            lastName: 'Doe'
          },
          relationships: {
            address: {
              data: {
                type: 'addr',
                id: 1
              }
            },
            images: {
              data: [
                { type: 'img', id: 1 },
                { type: 'img', id: 2 },
              ]
            }
          }
        }
      ],
      included: [
        {
          type: 'addr',
          id: 1,
          attributes: {
            street: 'Street 1'
          }
        }
      ]
    }

    expect(deserialize(serialized)).toEqual([
      {
        id: 1,
        firstName: 'Joe',
        lastName: 'Doe',
        address: {
          id: 1,
          street: 'Street 1'
        },
        images: [
          { id: 1 },
          { id: 2 }
        ]
      }
    ])
  })
});
