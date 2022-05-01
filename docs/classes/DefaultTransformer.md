[jsonapi-fractal](../README.md) / DefaultTransformer

# Class: DefaultTransformer<TEntity, TExtraOptions\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TEntity` | `unknown` |
| `TExtraOptions` | `void` |

## Hierarchy

- [`Transformer`](Transformer.md)<`TEntity`, `TExtraOptions`\>

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

• **new DefaultTransformer**<`TEntity`, `TExtraOptions`\>(`type`, `relationshipNames?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEntity` | `unknown` |
| `TExtraOptions` | `void` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `relationshipNames` | `string`[] | `[]` |

#### Overrides

[Transformer](Transformer.md).[constructor](Transformer.md#constructor)

#### Defined in

[src/default-transformer.ts:8](https://github.com/andersondanilo/jsonapi-fractal/blob/0809e68/src/default-transformer.ts#L8)

## Properties

### relationships

• `Readonly` **relationships**: `Record`<`string`, `RelationshipTransformerInfoFunction`<`TEntity`, `TExtraOptions`\>\>

#### Overrides

[Transformer](Transformer.md).[relationships](Transformer.md#relationships)

#### Defined in

[src/default-transformer.ts:6](https://github.com/andersondanilo/jsonapi-fractal/blob/0809e68/src/default-transformer.ts#L6)

___

### type

• **type**: `string`

#### Inherited from

[Transformer](Transformer.md).[type](Transformer.md#type)

## Methods

### transform

▸ **transform**(`entity`): `JsonObject`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `any` |

#### Returns

`JsonObject`

#### Overrides

[Transformer](Transformer.md).[transform](Transformer.md#transform)

#### Defined in

[src/default-transformer.ts:23](https://github.com/andersondanilo/jsonapi-fractal/blob/0809e68/src/default-transformer.ts#L23)
