"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor(render) {
        this.input = null;
        this.transformer = null;
        this.included = false;
        this.options = null;
        this.render = render;
    }
    withInput(input) {
        this.input = input;
        return this;
    }
    withTransformer(transformer) {
        this.transformer = transformer;
        return this;
    }
    withIncluded(included) {
        this.included = included;
        return this;
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    serialize() {
        return this.render(this);
    }
}
exports.default = Context;
