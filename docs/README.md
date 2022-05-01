jsonapi-fractal

# jsonapi-fractal

## Table of contents

### Classes

- [DefaultTransformer](classes/DefaultTransformer.md)
- [JsonApiFractalError](classes/JsonApiFractalError.md)
- [Transformer](classes/Transformer.md)

### Type aliases

- [AttributesObject](README.md#attributesobject)
- [Context](README.md#context)
- [DocumentObject](README.md#documentobject)
- [Options](README.md#options)
- [TransformerRelationships](README.md#transformerrelationships)

### Functions

- [deserialize](README.md#deserialize)
- [serialize](README.md#serialize)
- [transform](README.md#transform)
- [whitelist](README.md#whitelist)

## Type aliases

### AttributesObject

Ƭ **AttributesObject**: `JsonObject`

#### Defined in

[src/types.ts:17](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/types.ts#L17)

___

### Context

Ƭ **Context**<`TEntity`, `TExtraProperties`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEntity` | `TEntity` |
| `TExtraProperties` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `included` | `boolean` |
| `input` | `TEntity` \| `undefined` |
| `options` | [`Options`](README.md#options)<`TExtraProperties`\> |
| `transformer` | [`Transformer`](classes/Transformer.md)<`TEntity`, `TExtraProperties`\> |

#### Defined in

[src/context.ts:5](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/context.ts#L5)

___

### DocumentObject

Ƭ **DocumentObject**: `ExistingDocumentObject` \| `NewDocumentObject`

#### Defined in

[src/types.ts:15](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/types.ts#L15)

___

### Options

Ƭ **Options**<`TExtraOptions`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TExtraOptions` | `void` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `changeCase?` | `CaseType` |
| `extra?` | `TExtraOptions` |
| `fields?` | `Record`<`string`, `string`[]\> |
| `idKey?` | `string` |

#### Defined in

[src/types.ts:46](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/types.ts#L46)

___

### TransformerRelationships

Ƭ **TransformerRelationships**<`TEntity`, `TExtraOptions`\>: `Record`<`string`, `RelationshipTransformerInfoFunction`<`TEntity`, `TExtraOptions`\>\>

#### Type parameters

| Name |
| :------ |
| `TEntity` |
| `TExtraOptions` |

#### Defined in

[src/transformer.ts:14](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/transformer.ts#L14)

## Functions

### deserialize

▸ **deserialize**<`TEntity`, `TExtraOptions`\>(`response`, `options?`): `TEntity` \| `TEntity`[] \| `undefined`

Deserialize a JSON:API response

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEntity` | `TEntity` |
| `TExtraOptions` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`DocumentObject`](README.md#documentobject) |
| `options` | [`Options`](README.md#options)<`TExtraOptions`\> |

#### Returns

`TEntity` \| `TEntity`[] \| `undefined`

#### Defined in

[src/deserializer.ts:12](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/deserializer.ts#L12)

___

### serialize

▸ **serialize**<`TEntity`, `TExtraOptions`\>(`data`, `type`, `options?`): [`DocumentObject`](README.md#documentobject)

Serialize the entity

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEntity` | `TEntity` |
| `TExtraOptions` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `TEntity` | entity to be serialized |
| `type` | `string` | type of the entity |
| `options?` | `SerializeOptions`<`TExtraOptions`\> | options used in the serialization |

#### Returns

[`DocumentObject`](README.md#documentobject)

#### Defined in

[src/serializer.ts:32](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/serializer.ts#L32)

___

### transform

▸ **transform**<`TEntity`, `TExtraOptions`\>(): `ContextBuilder`<`TEntity`, `TExtraOptions`\>

Create a ContextBuilder, used to configure the transformation

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TEntity` | `TEntity` |
| `TExtraOptions` | `unknown` |

#### Returns

`ContextBuilder`<`TEntity`, `TExtraOptions`\>

#### Defined in

[src/serializer.ts:21](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/serializer.ts#L21)

___

### whitelist

▸ **whitelist**(`object`, `list`): [`AttributesObject`](README.md#attributesobject)

Keep only a set of fields on a given object

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `unknown` |
| `list` | `string`[] |

#### Returns

[`AttributesObject`](README.md#attributesobject)

#### Defined in

[src/utils.ts:40](https://github.com/andersondanilo/jsonapi-fractal/blob/f5b832b/src/utils.ts#L40)
