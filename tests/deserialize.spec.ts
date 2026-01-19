import { deserialize, DocumentObject, ExistingDocumentObject } from '../src'
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
        firstName: 'Joe',
        lastName: 'Doe',
        address: {
          id: '1',
          street: 'Street 1',
        },
        images: [{ id: '1' }, { id: '2' }],
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
        firstName: 'Joe',
        lastName: 'Doe',
        links: {
          self: 'https://example.org/users/1',
          action: 'https://example.org/action',
        },
        address: {
          id: '1',
          street: 'Street 1',
          links: {
            self: 'https://example.org/address/1/relationships/address',
            related: 'https://example.org/address/1',
          },
        },
        images: [{ id: '1' }, { id: '2' }],
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
        firstName: 'Joe',
        lastName: 'Doe',
        homeAddress: {
          id: '1',
          street: 'Street 1',
        },
      },
    ])
  })

  describe('typeKey option', () => {
    it('should include type in deserialized output when typeKey is specified', () => {
      const serialized: ExistingDocumentObject = {
        data: {
          type: 'users',
          id: '1',
          attributes: {
            firstName: 'Joe',
            lastName: 'Doe',
          },
        },
      }

      expect(deserialize(serialized, { typeKey: 'type' })).toStrictEqual({
        type: 'users',
        id: '1',
        firstName: 'Joe',
        lastName: 'Doe',
      })
    })

    it('should include type in array of deserialized objects', () => {
      const serialized: ExistingDocumentObject = {
        data: [
          {
            type: 'users',
            id: '1',
            attributes: { firstName: 'Joe' },
          },
          {
            type: 'users',
            id: '2',
            attributes: { firstName: 'Jane' },
          },
        ],
      }

      expect(deserialize(serialized, { typeKey: '_type' })).toStrictEqual([
        { _type: 'users', id: '1', firstName: 'Joe' },
        { _type: 'users', id: '2', firstName: 'Jane' },
      ])
    })

    it('should include type in relationships when typeKey is specified', () => {
      const serialized: DocumentObject = {
        data: {
          type: 'users',
          id: '1',
          attributes: { firstName: 'Joe' },
          relationships: {
            address: {
              data: { type: 'addresses', id: 'addr-1' },
            },
          },
        },
        included: [
          {
            type: 'addresses',
            id: 'addr-1',
            attributes: { street: 'Main St' },
          },
        ],
      }

      expect(deserialize(serialized, { typeKey: 'resourceType' })).toStrictEqual({
        resourceType: 'users',
        id: '1',
        firstName: 'Joe',
        address: {
          resourceType: 'addresses',
          id: 'addr-1',
          street: 'Main St',
        },
      })
    })

    it('should include type for relationships not in included array', () => {
      const serialized: DocumentObject = {
        data: {
          type: 'users',
          id: '1',
          attributes: { firstName: 'Joe' },
          relationships: {
            address: {
              data: { type: 'addresses', id: 'addr-1' },
            },
          },
        },
      }

      expect(deserialize(serialized, { typeKey: 'type' })).toStrictEqual({
        type: 'users',
        id: '1',
        firstName: 'Joe',
        address: {
          type: 'addresses',
          id: 'addr-1',
        },
      })
    })
  })
})
