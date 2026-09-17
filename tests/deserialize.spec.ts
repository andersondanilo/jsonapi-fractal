import { deserialize, DocumentObject } from '../src'
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

  it('should selectively preserve dynamic keys by resource type', () => {
    const serialized: DocumentObject = {
      data: {
        type: 'users',
        id: '1',
        attributes: {
          created_at: '2026-09-04',
          metadata: {
            known_field: { nested_field: 'transformed' },
            'X-Header': { Header_Value: 'unchanged' },
          },
        },
      },
    }

    expect(
      deserialize(serialized, {
        changeCase: CaseType.camelCase,
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
      }),
    ).toStrictEqual({
      id: '1',
      createdAt: '2026-09-04',
      metadata: {
        knownField: { nestedField: 'transformed' },
        'X-Header': { Header_Value: 'unchanged' },
      },
    })
  })

  it('should select a policy for each included resource type', () => {
    const serialized: DocumentObject = {
      data: {
        type: 'users',
        id: '1',
        attributes: {},
        relationships: {
          profile: {
            data: {
              type: 'profiles',
              id: 'profile-1',
            },
          },
        },
      },
      included: [
        {
          type: 'profiles',
          id: 'profile-1',
          attributes: {
            display_name: 'Primary',
            metadata: {
              'X-Header': {
                Header_Value: 'unchanged',
              },
            },
          },
        },
      ],
    }

    expect(
      deserialize(serialized, {
        changeCase: CaseType.camelCase,
        changeCaseDeep: true,
        keyTransformPoliciesByResourceType: {
          profiles: {
            knownKeys: {
              metadata: {
                unknownKeys: {
                  valuePolicy: 'preserve',
                },
              },
            },
          },
        },
      }),
    ).toStrictEqual({
      id: '1',
      profile: {
        id: 'profile-1',
        displayName: 'Primary',
        metadata: {
          'X-Header': {
            Header_Value: 'unchanged',
          },
        },
      },
    })
  })
})
