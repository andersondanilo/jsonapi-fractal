import { Transformer } from './transformer'
import { Options, DocumentObject } from './types'
import { JsonApiFractalError } from './errors'

export type Context<TEntity, TExtraProperties = unknown> = {
  input: TEntity | undefined
  transformer: Transformer<TEntity, TExtraProperties>
  included: boolean
  options: Options<TExtraProperties>
}

export class ContextBuilder<TEntity, TExtraProperties = unknown> {
  input?: TEntity
  transformer?: Transformer<TEntity, TExtraProperties>
  included = false
  options?: Options<TExtraProperties>

  constructor(protected renderFunction: (c: Context<TEntity, TExtraProperties>) => DocumentObject) {}

  withInput(input: TEntity) {
    this.input = input
    return this
  }

  withTransformer(transformer: Transformer<TEntity, TExtraProperties>) {
    this.transformer = transformer

    return this
  }

  withIncluded(included: boolean) {
    this.included = included

    return this
  }

  withOptions(options: Options<TExtraProperties>) {
    this.options = options

    return this
  }

  toContext(): Context<TEntity, TExtraProperties> {
    const transformer = this.transformer

    if (!transformer) {
      throw new JsonApiFractalError('transformer is required')
    }

    const options = this.options || ({} as Options<TExtraProperties>)

    return {
      input: this.input,
      transformer,
      included: this.included,
      options,
    }
  }

  serialize(): DocumentObject {
    return this.renderFunction(this.toContext())
  }
}
