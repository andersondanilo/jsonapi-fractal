[jsonapi-fractal](../README.md) / DefaultTransformer

# Class: DefaultTransformer<TEntity, TExtraOptions\>

## Type parameters

| Name            | Type      |
| :-------------- | :-------- |
| `TEntity`       | `unknown` |
| `TExtraOptions` | `void`    |

## Hierarchy

- [`Transformer`](Transformer.md)<`TEntity`, `TExtraOptions`\>

  ↳ **`DefaultTransformer`**

## Table of contents

### Constructors

- [constructor](DefaultTransformer.md#constructor)

### Properties

- [options](DefaultTransformer.md#options)
- [relationships](DefaultTransformer.md#relationships)
- [type](DefaultTransformer.md#type)

### Methods

- [transform](DefaultTransformer.md#transform)

## Constructors

### constructor

• **new DefaultTransformer**<`TEntity`, `TExtraOptions`\>(`type`, `relationships?`)

#### Type parameters

| Name            | Type      |
| :-------------- | :-------- |
| `TEntity`       | `unknown` |
| `TExtraOptions` | `void`    |

#### Parameters

| Name            | Type                                        | Default value |
| :-------------- | :------------------------------------------ | :------------ |
| `type`          | `string`                                    | `undefined`   |
| `relationships` | `string`[] \| `Record`<`string`, `string`\> | `[]`          |

#### Overrides

[Transformer](Transformer.md).[constructor](Transformer.md#constructor)

#### Defined in

[src/default-transformer.ts:9](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/default-transformer.ts#L9)

## Properties

### options

• `Optional` `Readonly` **options**: [`Options`](../README.md#options)<`TExtraOptions`\>

#### Defined in

[src/default-transformer.ts:7](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/default-transformer.ts#L7)

---

### relationships

• `Readonly` **relationships**: `Record`<`string`, [`RelationshipTransformerInfoFunction`](../README.md#relationshiptransformerinfofunction)<`TEntity`, `TExtraOptions`\>\>

#### Overrides

[Transformer](Transformer.md).[relationships](Transformer.md#relationships)

#### Defined in

[src/default-transformer.ts:6](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/default-transformer.ts#L6)

---

### type

• **type**: `string`

#### Inherited from

[Transformer](Transformer.md).[type](Transformer.md#type)

## Methods

### transform

▸ **transform**(`entity`): [`JsonObject`](../README.md#jsonobject)

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `entity` | `any` |

#### Returns

[`JsonObject`](../README.md#jsonobject)

#### Overrides

[Transformer](Transformer.md).[transform](Transformer.md#transform)

#### Defined in

[src/default-transformer.ts:29](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/default-transformer.ts#L29)
