import Transformer from './Transformer'
import Options from './Options'
import Context from './Context'
import JsonApiError from './errors/JsonApiError'
import DefaultTransformer from './DefaultTransformer'

export function transform () {
  return new Context(serialize);
}

function serialize (ctx: Context) {
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
      included.push(includedByType[type][id])
    }
  }

  return {
    data,
    included
  }
}

function serializeEntity (entity, transformer: Transformer, options: Options, includedByType) {
  const attributes = { ...transformer.transform(entity, options) };
  const idKey = options.idKey || 'id';
  const id = attributes[idKey];

  if (!id) {
    throw new JsonApiError('Resource without id')
  }

  delete attributes[idKey];

  const relationships = {};

  for (const relation of transformer.relationships) {
    const ctx = transformer[relation](entity, options);

    relationships[relation] = {
      data: Array.isArray(ctx.input)
        ? ctx.input.map((e) => serializeRelation(e, ctx.transformer, options, ctx.included, includedByType))
        : serializeRelation(ctx.input, ctx.transformer, options, ctx.included, includedByType)
    }
  }

  const data = {
    id,
    type: transformer.type,
    attributes,
    relationships
  };

  if (Object.keys(data.relationships).length === 0) {
    delete data.relationships
  }

  return data
}

function serializeRelation (entity, transformer: Transformer, options: Options, included: boolean, includedByType) {
  if (!entity) {
    return null;
  }

  const idKey = options.idKey || 'id';
  const id = entity[idKey];

  if (!id) {
    throw new JsonApiError('Resource without id')
  }

  if (included) {
    if (!(transformer.type in includedByType)) {
      includedByType[transformer.type] = []
    }

    if (!(id in includedByType[transformer.type])) {
      includedByType[transformer.type][id] = serializeEntity(
        entity,
        transformer,
        options,
        includedByType
      )
    }
  }

  return {
    type: transformer.type,
    id
  }
}

export function whitelist (obj, list) {
  const result = {}

  for (const key of list) {
    result[key] = obj[key]
  }

  return result
}

export { Transformer, DefaultTransformer }
