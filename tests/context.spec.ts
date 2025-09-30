import { ContextBuilder } from '../src/context'
import { JsonApiFractalError } from '../src/errors'

describe('ContextBuilder', () => {
  describe('toContext', () => {
    it('should throw exception when the transformer was not provided', () => {
      expect(() => {
        new ContextBuilder(
          () =>
            ({
              name: 'test',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as any,
        ).toContext()
      }).toThrow(JsonApiFractalError)
    })
  })
})
