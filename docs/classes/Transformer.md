[jsonapi-fractal](../README.md) / Transformer

# Class: Transformer

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

• **new Transformer**()

## Properties

### relationships

• **relationships**: `string`[] = `[]`

#### Defined in

[Transformer.ts:5](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Transformer.ts#L5)

___

### type

• **type**: `string` = `'entities'`

#### Defined in

[Transformer.ts:4](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Transformer.ts#L4)

## Methods

### transform

▸ `Abstract` **transform**(`entity`, `options`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `any` |
| `options` | [`Options`](../interfaces/Options.md) |

#### Returns

`any`

#### Defined in

[Transformer.ts:7](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Transformer.ts#L7)
