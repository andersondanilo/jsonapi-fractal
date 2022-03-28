[jsonapi-fractal](../README.md) / DefaultTransformer

# Class: DefaultTransformer

## Hierarchy

- [`Transformer`](Transformer.md)

  ↳ **`DefaultTransformer`**

## Table of contents

### Constructors

- [constructor](DefaultTransformer.md#constructor)

### Properties

- [relationships](DefaultTransformer.md#relationships)
- [type](DefaultTransformer.md#type)

### Methods

- [transform](DefaultTransformer.md#transform)

## Constructors

### constructor

• **new DefaultTransformer**(`type`, `relationships?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `any` | `undefined` |
| `relationships` | `any`[] | `[]` |

#### Overrides

[Transformer](Transformer.md).[constructor](Transformer.md#constructor)

#### Defined in

[DefaultTransformer.ts:7](https://github.com/andersondanilo/jsonapi-fractal/blob/de98cb3/src/DefaultTransformer.ts#L7)

## Properties

### relationships

• **relationships**: `string`[] = `[]`

#### Inherited from

[Transformer](Transformer.md).[relationships](Transformer.md#relationships)

#### Defined in

[Transformer.ts:5](https://github.com/andersondanilo/jsonapi-fractal/blob/de98cb3/src/Transformer.ts#L5)

___

### type

• **type**: `string` = `'entities'`

#### Overrides

[Transformer](Transformer.md).[type](Transformer.md#type)

#### Defined in

[DefaultTransformer.ts:5](https://github.com/andersondanilo/jsonapi-fractal/blob/de98cb3/src/DefaultTransformer.ts#L5)

## Methods

### transform

▸ **transform**(`entity`, `options`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `any` |
| `options` | [`Options`](../interfaces/Options.md) |

#### Returns

`any`

#### Overrides

[Transformer](Transformer.md).[transform](Transformer.md#transform)

#### Defined in

[DefaultTransformer.ts:23](https://github.com/andersondanilo/jsonapi-fractal/blob/de98cb3/src/DefaultTransformer.ts#L23)
