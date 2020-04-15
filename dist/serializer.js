"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const DefaultTransformer_1 = require("./DefaultTransformer");
const JsonApiError_1 = require("./errors/JsonApiError");
const utils_1 = require("./utils");
function transform() {
    return new Context_1.default(serializeContext);
}
exports.transform = transform;
function serialize(data, type, options) {
    if (!options) {
        options = {};
    }
    return transform()
        .withInput(data)
        .withTransformer(new DefaultTransformer_1.default(type, options.relationships || []))
        .withOptions(options)
        .serialize();
}
exports.serialize = serialize;
function serializeContext(ctx) {
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
    const result = { data };
    if (included.length > 0) {
        result.included = included;
    }
    return result;
}
exports.serializeContext = serializeContext;
function serializeEntity(entity, transformer, options, includedByType) {
    let attributes = Object.assign({}, transformer.transform(entity, options));
    const idKey = options.idKey || 'id';
    const id = attributes[idKey] || entity[idKey];
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
        attributes = utils_1.whitelist(attributes, allowed);
    }
    if (options.changeCase) {
        attributes = utils_1.changeCase(attributes, options.changeCase);
    }
    const data = {
        id,
        type: transformer.type,
        attributes,
        relationships
    };
    if (typeof (data.id) === 'undefined' || data.id === null) {
        delete data[id];
    }
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
    let id = entity[idKey];
    if (!id && entity) {
        id = entity;
    }
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
