import Tranformer from './Transformer';
import Options from './Options';
export default class Context {
    input: any;
    transformer: Tranformer;
    included: boolean;
    options: any;
    render: (b: any) => null;
    constructor(render: any);
    withInput(input: any): this;
    withTransformer(transformer: Tranformer): this;
    withIncluded(included: any): this;
    withOptions(options: Options): this;
    serialize(): null;
}
