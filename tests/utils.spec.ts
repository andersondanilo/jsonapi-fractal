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
    expect(changeCase(input, CaseType.kebabCase, true)).toEqual({
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
})
