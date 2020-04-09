import Transformer from './Transformer'
import Options from './Options'

export default class DefaultTransformer extends Transformer {
  type: string = 'entities';

  constructor (type, relationships = []) {
    super()
    this.type = type
    this.relationships = relationships || []

    for (const rel of this.relationships) {
      this[rel] = (entity) => {
        return {
          input: entity[rel],
          transformer: new DefaultTransformer(rel),
          included: false
        }
      }
    }
  }

  transform (entity: any, options: Options) {
    const attributes = { ... entity }

    for (const rel of this.relationships) {
      delete attributes[rel]
    }

    return attributes
  }
}
