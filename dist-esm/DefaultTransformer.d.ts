import Transformer from './Transformer';
import Options from './Options';
export default class DefaultTransformer extends Transformer {
    type: string;
    constructor(type: any, relationships?: any[]);
    transform(entity: any, options: Options): any;
}
