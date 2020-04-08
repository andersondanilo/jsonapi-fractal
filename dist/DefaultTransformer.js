"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transformer_1 = require("./Transformer");
class DefaultTransformer extends Transformer_1.default {
    constructor(type) {
        super();
        this.type = 'entities';
        this.type = type;
    }
    transform(entity, options) {
        return entity;
    }
}
exports.default = DefaultTransformer;
