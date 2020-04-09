# jsonapi-fractal
JSON:API Serializer inspired by Fractal (PHP)

## Simple Serialize
```js
import { serialize } from 'json-api-fractal'

const entity = {
  id: 1,
  firstName: 'Joe',
  lastName: 'Doe',
  address: {
    id: 1
  },
  images: [
    { id: 1 },
    { id: 2 }
  ]
}

const serialized = serialize(entity, 'users', {
  relationships: ['address', 'images'],
  changeCase: 'kebabCase'
})
```

## Deserialize
```js
import { deserialize } from 'jsonapi-fractal'
const serializedData = ...
const entity = deserialize(serializedData, { changeCase: 'camelCase' })
```
## Serialize with transformers
```js
import { Transformer, DefaultTransformer, transform } from 'jsonapi-transformer'

class UserTransformer extends Transformer {
  constructor() {
    super()
    this.type = 'users'
  }
}
```
