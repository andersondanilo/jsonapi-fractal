# jsonapi-fractal
JSON:API Serializer inspired by Fractal (PHP)

## Simple Serialize
```js
import { serialize } from 'jsonapi-fractal'

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
import { Transformer, DefaultTransformer, transform, whitelist } from 'jsonapi-fractal'

class UserTransformer extends Transformer {
  constructor() {
    super()
    this.type = 'users'
    this.relationships = ['images']
  }
  
  transform (user, options) {
    return whitelist(user, ['_id', 'firstName', 'lastName'])
  }
  
  images (user, options) {
    return transform()
      .withInput(user.images)
      .withTransformer(new DefaultTransformer('images'))
      .withIncluded(true)
  }
}

const user = {
  _id: 1,
  firstName: 'Joe',
  lastName: 'Doe',
  images: [
    { _id: 5, url: 'http://' }
  ]
}

const serialized = transform()
  .withInput(user)
  .withTransformer(new UserTransformer)
  .withOptions({ idKey: '_id' })
  .serialize()
```
