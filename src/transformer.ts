import { AttributesObject, Options } from './types'

export abstract class Transformer<TEntity, TExtraOptions> {
  public type: string
  public relationships: TransformerRelationships<TEntity, TExtraOptions>
  public abstract transform(entity: TEntity, options: Options<TExtraOptions>): AttributesObject

  constructor() {
    this.type = ''
    this.relationships = {}
  }
}

export type TransformerRelationships<TEntity, TExtraOptions> = Record<
  string,
  RelationshipTransformerInfoFunction<TEntity, TExtraOptions>
>

export type RelationshipTransformerInfoFunction<TEntity, TExtraOptions> = (
  entity: TEntity,
  options: Options<TExtraOptions>,
) => RelationshipTransformerInfo<TExtraOptions>

export type RelationshipTransformerInfo<TExtraOptions, T = unknown> = {
  input: T
  transformer: Transformer<T, TExtraOptions>
  included: boolean
}
