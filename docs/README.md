jsonapi-fractal

# jsonapi-fractal

## Table of contents

### Classes

- [Context](classes/Context.md)
- [DefaultTransformer](classes/DefaultTransformer.md)
- [Transformer](classes/Transformer.md)

### Interfaces

- [JsonApiResponse](interfaces/JsonApiResponse.md)
- [Options](interfaces/Options.md)

### Functions

- [deserialize](README.md#deserialize)
- [serialize](README.md#serialize)
- [transform](README.md#transform)
- [whitelist](README.md#whitelist)

## Functions

### deserialize

▸ **deserialize**(`response`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `any` |
| `options` | `Object` |

#### Returns

`any`

#### Defined in

[deserializer.ts:3](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/deserializer.ts#L3)

___

### serialize

▸ **serialize**(`data`, `type`, `options`): [`JsonApiResponse`](interfaces/JsonApiResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `type` | `any` |
| `options` | `any` |

#### Returns

[`JsonApiResponse`](interfaces/JsonApiResponse.md)

#### Defined in

[serializer.ts:13](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/serializer.ts#L13)

___

### transform

▸ **transform**(): [`Context`](classes/Context.md)

#### Returns

[`Context`](classes/Context.md)

#### Defined in

[serializer.ts:9](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/serializer.ts#L9)

___

### whitelist

▸ **whitelist**(`obj`, `list`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |
| `list` | `any` |

#### Returns

`Object`

#### Defined in

[utils.ts:26](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/utils.ts#L26)
