import Transformer from './Transformer';
export default class DefaultTransformer extends Transformer {
    constructor(type) {
        super();
        this.type = 'entities';
        this.type = type;
    }
    transform(entity, options) {
        return entity;
    }
}
