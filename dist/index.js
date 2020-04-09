"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transformer_1 = require("./Transformer");
exports.Transformer = Transformer_1.default;
const Context_1 = require("./Context");
const JsonApiError_1 = require("./errors/JsonApiError");
const DefaultTransformer_1 = require("./DefaultTransformer");
exports.DefaultTransformer = DefaultTransformer_1.default;
function transform() {
    return new Context_1.default(serialize);
}
exports.transform = transform;
function serialize(ctx) {
    if (!ctx.options) {
        ctx.options = {};
    }
    if (ctx.input === null) {
        return null;
    }
    const includedByType = {};
    const data = Array.isArray(ctx.input)
        ? ctx.input.map((e) => serializeEntity(e, ctx.transformer, ctx.options, includedByType))
        : serializeEntity(ctx.input, ctx.transformer, ctx.options, includedByType);
    const included = [];
    for (const type of Object.keys(includedByType)) {
        for (const id of Object.keys(includedByType[type])) {
            included.push(includedByType[type][id]);
        }
    }
    return {
        data,
        included
    };
}
function serializeEntity(entity, transformer, options, includedByType) {
    let attributes = Object.assign({}, transformer.transform(entity, options));
    const idKey = options.idKey || 'id';
    const id = attributes[idKey] || entity[idKey];
    if (!id) {
        throw new JsonApiError_1.default('Resource without id');
    }
    delete attributes[idKey];
    const relationships = {};
    for (const relation of transformer.relationships) {
        const ctx = transformer[relation](entity, options);
        relationships[relation] = {
            data: Array.isArray(ctx.input)
                ? ctx.input.map((e) => serializeRelation(e, ctx.transformer, options, ctx.included, includedByType))
                : serializeRelation(ctx.input, ctx.transformer, options, ctx.included, includedByType)
        };
    }
    if (options.fields && options.fields[transformer.type]) {
        const allowed = typeof (options.fields[transformer.type]) === 'string'
            ? options.fields[transformer.type].split(',')
            : options.fields[transformer.type].split(',');
        attributes = whitelist(attributes, allowed);
    }
    const data = {
        id,
        type: transformer.type,
        attributes,
        relationships
    };
    if (Object.keys(data.relationships).length === 0) {
        delete data.relationships;
    }
    return data;
}
function serializeRelation(entity, transformer, options, included, includedByType) {
    if (!entity) {
        return null;
    }
    const idKey = options.idKey || 'id';
    const id = entity[idKey];
    if (!id) {
        throw new JsonApiError_1.default('Resource without id');
    }
    if (included) {
        if (!(transformer.type in includedByType)) {
            includedByType[transformer.type] = [];
        }
        if (!(id in includedByType[transformer.type])) {
            includedByType[transformer.type][id] = serializeEntity(entity, transformer, options, includedByType);
        }
    }
    return {
        type: transformer.type,
        id
    };
}
function whitelist(obj, list) {
    const result = {};
    for (const key of list) {
        result[key] = obj[key];
    }
    return result;
}
exports.whitelist = whitelist;
