[jsonapi-fractal](../README.md) / Context

# Class: Context

## Table of contents

### Constructors

- [constructor](Context.md#constructor)

### Properties

- [included](Context.md#included)
- [input](Context.md#input)
- [options](Context.md#options)
- [render](Context.md#render)
- [transformer](Context.md#transformer)

### Methods

- [serialize](Context.md#serialize)
- [withIncluded](Context.md#withincluded)
- [withInput](Context.md#withinput)
- [withOptions](Context.md#withoptions)
- [withTransformer](Context.md#withtransformer)

## Constructors

### constructor

• **new Context**(`render`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `render` | `any` |

#### Defined in

[Context.ts:12](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L12)

## Properties

### included

• **included**: `boolean` = `false`

#### Defined in

[Context.ts:8](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L8)

___

### input

• **input**: `any` = `null`

#### Defined in

[Context.ts:6](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L6)

___

### options

• **options**: `any` = `null`

#### Defined in

[Context.ts:9](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L9)

___

### render

• **render**: (`c`: [`Context`](Context.md)) => [`JsonApiResponse`](../interfaces/JsonApiResponse.md)

#### Type declaration

▸ (`c`): [`JsonApiResponse`](../interfaces/JsonApiResponse.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Context`](Context.md) |

##### Returns

[`JsonApiResponse`](../interfaces/JsonApiResponse.md)

#### Defined in

[Context.ts:10](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L10)

___

### transformer

• **transformer**: [`Transformer`](Transformer.md) = `null`

#### Defined in

[Context.ts:7](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L7)

## Methods

### serialize

▸ **serialize**(): [`JsonApiResponse`](../interfaces/JsonApiResponse.md)

#### Returns

[`JsonApiResponse`](../interfaces/JsonApiResponse.md)

#### Defined in

[Context.ts:40](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L40)

___

### withIncluded

▸ **withIncluded**(`included`): [`Context`](Context.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `included` | `any` |

#### Returns

[`Context`](Context.md)

#### Defined in

[Context.ts:28](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L28)

___

### withInput

▸ **withInput**(`input`): [`Context`](Context.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

#### Returns

[`Context`](Context.md)

#### Defined in

[Context.ts:16](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L16)

___

### withOptions

▸ **withOptions**(`options`): [`Context`](Context.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Options.md) |

#### Returns

[`Context`](Context.md)

#### Defined in

[Context.ts:34](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L34)

___

### withTransformer

▸ **withTransformer**(`transformer`): [`Context`](Context.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transformer` | [`Transformer`](Transformer.md) |

#### Returns

[`Context`](Context.md)

#### Defined in

[Context.ts:22](https://github.com/andersondanilo/jsonapi-fractal/blob/c2e4199/src/Context.ts#L22)
