import { changeCase } from '../src/utils'
import { CaseType } from '../src/types'

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
})
