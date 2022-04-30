export class JsonApiFractalError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'JsonApiFractalError'
  }
}
