import { JsonApiFractalError } from '../src/errors'

describe('JsonApiFractalError', () => {
  describe('constructor', () => {
    it('should set the name', () => {
      const error = new JsonApiFractalError('my message')
      expect(error.name).toEqual('JsonApiFractalError')
      expect(error.message).toEqual('my message')
    })
  })
})
