import { deserialize } from '../src/index'

describe('deserialize', () => {
  it('Complex serialize', () => {
    const serialized = {
      data: [
        {
          type: 'users',
          id: 1,
          attributes: {
            'first-name': 'Joe',
            'last-name': 'Doe',
            'birthday': {
              'day-of-birth': 1,
              'month-of-birth': 1,
              'year-of-birth': 1970
            }
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

    expect(deserialize(serialized, { changeCase: 'camelCase', deep: true })).toEqual([
      {
        id: 1,
        firstName: 'Joe',
        lastName: 'Doe',
        birthday: {
          dayOfBirth: 1,
          monthOfBirth: 1,
          yearOfBirth: 1970
        },
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

  it('Deserialize data without attributes', () => {
    const serialized = {
      data: [
        {
          type: 'users',
          id: 1,
          relationships: {
            address: {
              data: {
                type: 'addr',
                id: 1
              }
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
        address: {
          id: 1,
          street: 'Street 1'
        }
      }
    ])
  })
});
