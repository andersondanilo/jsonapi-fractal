# jsonapi-fractal
[![npm version](https://badge.fury.io/js/jsonapi-fractal.svg)](https://badge.fury.io/js/jsonapi-fractal)
[![Test](https://github.com/andersondanilo/jsonapi-fractal/actions/workflows/test.yml/badge.svg)](https://github.com/andersondanilo/jsonapi-fractal/actions/workflows/test.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/83d0ccc37861951910b1/test_coverage)](https://codeclimate.com/github/andersondanilo/jsonapi-fractal/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/83d0ccc37861951910b1/maintainability)](https://codeclimate.com/github/andersondanilo/jsonapi-fractal/maintainability)
![License](https://img.shields.io/github/license/andersondanilo/jsonapi-fractal)

JSON:API Serializer inspired by Fractal (PHP)

## Installation
```
yarn add jsonapi-fractal
OR
npm install jsonapi-fractal --save
```

## Simple Serialize
```js
// examples/simple-serialize.js

const { serialize } = require('jsonapi-fractal')

const entity = {
  id: 1,
  firstName: 'Joe',
  lastName: 'Doe',
  address: {
    id: 1,
  },
  images: [{ id: 1 }, { id: 2 }],
}

const serialized = serialize(entity, 'users', {
  relationships: ['address', 'images'],
  changeCase: 'kebabCase',
})

console.log(JSON.stringify(serialized))

/**
 * OUTPUT:
 *
 * {
 *   "data": {
 *     "id": 1,
 *     "type": "users",
 *     "attributes": {
 *       "first-name": "Joe",
 *       "last-name": "Doe"
 *     },
 *     "relationships": {
 *       "address": {
 *         "data": {
 *           "id": 1,
 *           "type": "address"
 *         }
 *       },
 *       "images": {
 *         "data": [
 *           {
 *             "id": 1,
 *             "type": "images"
 *           },
 *           {
 *             "id": 2,
 *             "type": "images"
 *           }
 *         ]
 *       }
 *     }
 *   }
 * }
 */

```

## Deserialize
```js
// examples/deserialize.js

const { deserialize } = require('jsonapi-fractal')

const serializedData = {
  data: {
    id: 'myuserid',
    type: 'users',
    attributes: {
      name: 'Joe',
      'last-name': 'Doe',
    },
  },
}
const entity = deserialize(serializedData, { changeCase: 'camelCase' })

console.log(JSON.stringify(entity))

/**
 * OUTPUT:
 *
 * {
 *   "id": "myuserid",
 *   "name": "Joe",
 *   "lastName": "Doe"
 * }
 */

```

## Serialize with transformers
```js
// examples/serialize-with-transformers.js
```

## Links
- [Documentation](docs/README.md)
- [JSON:API Specification (v1.0)](https://jsonapi.org/format)
