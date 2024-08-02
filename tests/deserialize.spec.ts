import { deserialize, typeField, DocumentObject } from '../src'
import { CaseType } from '../src/types'

describe('deserialize', () => {
  it('deserialize relationships included and not included', () => {
    const serialized: DocumentObject = {
      data: [
        {
          type: 'users',
          id: '1',
          attributes: {
            'first-name': 'Joe',
            'last-name': 'Doe',
          },
          relationships: {
            address: {
              data: {
                type: 'addr',
                id: '1',
              },
            },
            images: {
              data: [
                { type: 'img', id: '1' },
                { type: 'img', id: '2' },
              ],
            },
          },
        },
      ],
      included: [
        {
          type: 'addr',
          id: '1',
          attributes: {
            street: 'Street 1',
          },
        },
      ],
    }

    expect(deserialize(serialized, { changeCase: CaseType.camelCase })).toStrictEqual([
      {
        id: '1',
        [typeField]: 'users',
        firstName: 'Joe',
        lastName: 'Doe',
        address: {
          id: '1',
          [typeField]: 'addr',
          street: 'Street 1',
        },
        images: [
          { id: '1', [typeField]: 'img' },
          { id: '2', [typeField]: 'img' },
        ],
      },
    ])
  })

  it('deserialize includes links', () => {
    const serialized: DocumentObject = {
      data: [
        {
          type: 'users',
          id: '1',
          attributes: {
            'first-name': 'Joe',
            'last-name': 'Doe',
          },
          links: {
            self: 'https://example.org/users/1',
            action: 'https://example.org/action',
          },
          relationships: {
            address: {
              data: {
                type: 'addr',
                id: '1',
              },
              links: {
                self: 'https://example.org/address/1/relationships/address',
                related: 'https://example.org/address/1',
              },
            },
            images: {
              data: [
                { type: 'img', id: '1' },
                { type: 'img', id: '2' },
              ],
            },
          },
        },
      ],
      included: [
        {
          type: 'addr',
          id: '1',
          attributes: {
            street: 'Street 1',
          },
        },
      ],
    }

    expect(deserialize(serialized, { changeCase: CaseType.camelCase })).toStrictEqual([
      {
        id: '1',
        [typeField]: 'users',
        firstName: 'Joe',
        lastName: 'Doe',
        links: {
          self: 'https://example.org/users/1',
          action: 'https://example.org/action',
        },
        address: {
          id: '1',
          [typeField]: 'addr',
          street: 'Street 1',
          links: {
            self: 'https://example.org/address/1/relationships/address',
            related: 'https://example.org/address/1',
          },
        },
        images: [
          { id: '1', [typeField]: 'img' },
          { id: '2', [typeField]: 'img' },
        ],
      },
    ])
  })

  it('should change relationship name casing', () => {
    const serialized: DocumentObject = {
      data: [
        {
          type: 'users',
          id: '1',
          attributes: {
            'first-name': 'Joe',
            'last-name': 'Doe',
          },
          relationships: {
            home_address: {
              data: {
                type: 'addr',
                id: '1',
              },
            },
          },
        },
      ],
      included: [
        {
          type: 'addr',
          id: '1',
          attributes: {
            street: 'Street 1',
          },
        },
      ],
    }

    expect(deserialize(serialized, { changeCase: CaseType.camelCase })).toStrictEqual([
      {
        id: '1',
        [typeField]: 'users',
        firstName: 'Joe',
        lastName: 'Doe',
        homeAddress: {
          id: '1',
          [typeField]: 'addr',
          street: 'Street 1',
        },
      },
    ])
  })
})
