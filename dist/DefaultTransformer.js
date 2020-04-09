"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transformer_1 = require("./Transformer");
class DefaultTransformer extends Transformer_1.default {
    constructor(type, relationships = []) {
        super();
        this.type = 'entities';
        this.type = type;
        this.relationships = relationships || [];
        for (const rel of this.relationships) {
            this[rel] = (entity) => {
                return {
                    input: entity[rel],
                    transformer: new DefaultTransformer(rel),
                    included: false
                };
            };
        }
    }
    transform(entity, options) {
        const attributes = Object.assign({}, entity);
        for (const rel of this.relationships) {
            delete attributes[rel];
        }
        return attributes;
    }
}
exports.default = DefaultTransformer;
