import Tranformer from './Transformer'
import Options from './Options'
import JsonApiResponse from './JsonApiResponse'

export default class Context {
  input: any = null;
  transformer: Tranformer = null;
  included: boolean = false;
  options: any = null;
  render: (c: Context) => JsonApiResponse;

  constructor (render) {
    this.render = render;
  }

  withInput (input) {
    this.input = input;

    return this;
  }

  withTransformer (transformer: Tranformer) {
    this.transformer = transformer;

    return this;
  }

  withIncluded (included) {
    this.included = included;

    return this;
  }

  withOptions (options: Options) {
    this.options = options

    return this;
  }

  serialize (): JsonApiResponse {
    return this.render(this);
  }
}
