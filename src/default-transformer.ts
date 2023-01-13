import { RelationshipTransformerInfo, RelationshipTransformerInfoFunction, Transformer } from './transformer'
import { AttributesObject } from './types'
import { createRecordFromKeys } from './utils'

export class DefaultTransformer<TEntity = unknown, TExtraOptions = void> extends Transformer<TEntity, TExtraOptions> {
  public readonly relationships: Record<string, RelationshipTransformerInfoFunction<TEntity, TExtraOptions>>

  constructor(public type: string, relationships: string[] | Record<string, string> = []) {
    super()

    const relationshipNames = Array.isArray(relationships) ? relationships : Object.keys(relationships)

    this.relationships = createRecordFromKeys(relationshipNames, (relationName: string) => {
      return (entity: TEntity): RelationshipTransformerInfo<TExtraOptions> => {
        return {
          input: entity[relationName as never] as unknown,
          transformer: new DefaultTransformer<unknown, TExtraOptions>(
            Array.isArray(relationships) ? relationName : relationships[relationName],
            [],
          ),
          included: false,
        }
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(entity: any): AttributesObject {
    const attributes = { ...entity }

    for (const relationship in this.relationships) {
      delete attributes[relationship]
    }

    return attributes
  }
}
