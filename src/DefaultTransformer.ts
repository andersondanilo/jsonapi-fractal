import Transformer from './Transformer'
import Options from './Options'

export default class DefaultTransformer extends Transformer {
  type: string = 'entities';

  constructor (type) {
    super()
    this.type = type
  }

  transform (entity: any, options: Options) {
    return entity
  }
}
