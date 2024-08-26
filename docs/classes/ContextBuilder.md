[jsonapi-fractal](../README.md) / ContextBuilder

# Class: ContextBuilder<TEntity, TExtraProperties\>

## Type parameters

| Name               | Type      |
| :----------------- | :-------- |
| `TEntity`          | `TEntity` |
| `TExtraProperties` | `unknown` |

## Table of contents

### Constructors

- [constructor](ContextBuilder.md#constructor)

### Properties

- [included](ContextBuilder.md#included)
- [input](ContextBuilder.md#input)
- [options](ContextBuilder.md#options)
- [renderFunction](ContextBuilder.md#renderfunction)
- [transformer](ContextBuilder.md#transformer)

### Methods

- [serialize](ContextBuilder.md#serialize)
- [toContext](ContextBuilder.md#tocontext)
- [withIncluded](ContextBuilder.md#withincluded)
- [withInput](ContextBuilder.md#withinput)
- [withOptions](ContextBuilder.md#withoptions)
- [withTransformer](ContextBuilder.md#withtransformer)

## Constructors

### constructor

• **new ContextBuilder**<`TEntity`, `TExtraProperties`\>(`renderFunction`)

#### Type parameters

| Name               | Type      |
| :----------------- | :-------- |
| `TEntity`          | `TEntity` |
| `TExtraProperties` | `unknown` |

#### Parameters

| Name             | Type                                                                                                                        |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `renderFunction` | (`c`: [`Context`](../README.md#context)<`TEntity`, `TExtraProperties`\>) => [`DocumentObject`](../README.md#documentobject) |

#### Defined in

[src/context.ts:18](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L18)

## Properties

### included

• **included**: `boolean` = `false`

#### Defined in

[src/context.ts:15](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L15)

---

### input

• `Optional` **input**: `TEntity`

#### Defined in

[src/context.ts:13](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L13)

---

### options

• `Optional` **options**: [`Options`](../README.md#options)<`TExtraProperties`\>

#### Defined in

[src/context.ts:16](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L16)

---

### renderFunction

• `Protected` **renderFunction**: (`c`: [`Context`](../README.md#context)<`TEntity`, `TExtraProperties`\>) => [`DocumentObject`](../README.md#documentobject)

#### Type declaration

▸ (`c`): [`DocumentObject`](../README.md#documentobject)

##### Parameters

| Name | Type                                                              |
| :--- | :---------------------------------------------------------------- |
| `c`  | [`Context`](../README.md#context)<`TEntity`, `TExtraProperties`\> |

##### Returns

[`DocumentObject`](../README.md#documentobject)

---

### transformer

• `Optional` **transformer**: [`Transformer`](Transformer.md)<`TEntity`, `TExtraProperties`\>

#### Defined in

[src/context.ts:14](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L14)

## Methods

### serialize

▸ **serialize**(): [`DocumentObject`](../README.md#documentobject)

#### Returns

[`DocumentObject`](../README.md#documentobject)

#### Defined in

[src/context.ts:60](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L60)

---

### toContext

▸ **toContext**(): [`Context`](../README.md#context)<`TEntity`, `TExtraProperties`\>

#### Returns

[`Context`](../README.md#context)<`TEntity`, `TExtraProperties`\>

#### Defined in

[src/context.ts:43](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L43)

---

### withIncluded

▸ **withIncluded**(`included`): [`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `included` | `boolean` |

#### Returns

[`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Defined in

[src/context.ts:31](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L31)

---

### withInput

▸ **withInput**(`input`): [`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `input` | `TEntity` |

#### Returns

[`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Defined in

[src/context.ts:20](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L20)

---

### withOptions

▸ **withOptions**(`options`): [`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Parameters

| Name      | Type                                                   |
| :-------- | :----------------------------------------------------- |
| `options` | [`Options`](../README.md#options)<`TExtraProperties`\> |

#### Returns

[`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Defined in

[src/context.ts:37](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L37)

---

### withTransformer

▸ **withTransformer**(`transformer`): [`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Parameters

| Name          | Type                                                            |
| :------------ | :-------------------------------------------------------------- |
| `transformer` | [`Transformer`](Transformer.md)<`TEntity`, `TExtraProperties`\> |

#### Returns

[`ContextBuilder`](ContextBuilder.md)<`TEntity`, `TExtraProperties`\>

#### Defined in

[src/context.ts:25](https://github.com/andersondanilo/jsonapi-fractal/blob/5f3ab68/src/context.ts#L25)
