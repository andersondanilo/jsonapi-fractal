[jsonapi-fractal](../README.md) / Transformer

# Class: Transformer<TEntity, TExtraOptions\>

## Type parameters

| Name            |
| :-------------- |
| `TEntity`       |
| `TExtraOptions` |

## Hierarchy

- **`Transformer`**

  ↳ [`DefaultTransformer`](DefaultTransformer.md)

## Table of contents

### Constructors

- [constructor](Transformer.md#constructor)

### Properties

- [relationships](Transformer.md#relationships)
- [type](Transformer.md#type)

### Methods

- [transform](Transformer.md#transform)

## Constructors

### constructor

• **new Transformer**<`TEntity`, `TExtraOptions`\>()

#### Type parameters

| Name            |
| :-------------- |
| `TEntity`       |
| `TExtraOptions` |

#### Defined in

[src/transformer.ts:8](https://github.com/andersondanilo/jsonapi-fractal/blob/43f9c51/src/transformer.ts#L8)

## Properties

### relationships

• **relationships**: [`TransformerRelationships`](../README.md#transformerrelationships)<`TEntity`, `TExtraOptions`\>

#### Defined in

[src/transformer.ts:5](https://github.com/andersondanilo/jsonapi-fractal/blob/43f9c51/src/transformer.ts#L5)

---

### type

• **type**: `string`

#### Defined in

[src/transformer.ts:4](https://github.com/andersondanilo/jsonapi-fractal/blob/43f9c51/src/transformer.ts#L4)

## Methods

### transform

▸ `Abstract` **transform**(`entity`, `options`): [`JsonObject`](../README.md#jsonobject)

#### Parameters

| Name      | Type                                                |
| :-------- | :-------------------------------------------------- |
| `entity`  | `TEntity`                                           |
| `options` | [`Options`](../README.md#options)<`TExtraOptions`\> |

#### Returns

[`JsonObject`](../README.md#jsonobject)

#### Defined in

[src/transformer.ts:6](https://github.com/andersondanilo/jsonapi-fractal/blob/43f9c51/src/transformer.ts#L6)
