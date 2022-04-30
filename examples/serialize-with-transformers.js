const { Transformer, DefaultTransformer, transform, whitelist } = require('jsonapi-fractal')

class UserTransformer extends Transformer {
  constructor() {
    super()
    this.type = 'users'
    this.relationships = {
      images: this.images,
    }
  }

  transform(user, options) {
    return whitelist(user, ['_id', 'firstName', 'lastName'])
  }

  images(user, options) {
    return transform()
      .withInput(user.images)
      .withTransformer(new DefaultTransformer('images'))
      .withIncluded(true)
      .toContext()
  }
}

const user = {
  _id: 1,
  firstName: 'Joe',
  lastName: 'Doe',
  images: [{ _id: 5, url: 'http://' }],
}

const serialized = transform()
  .withInput(user)
  .withTransformer(new UserTransformer())
  .withOptions({ idKey: '_id' })
  .serialize()

console.log(JSON.stringify(serialized))

/**
 * OUTPUT:
 *
 * {
 *   "data": {
 *     "id": 1,
 *     "type": "users",
 *     "attributes": {
 *       "firstName": "Joe",
 *       "lastName": "Doe"
 *     },
 *     "relationships": {
 *       "images": {
 *         "data": [
 *           {
 *             "id": 5,
 *             "type": "images"
 *           }
 *         ]
 *       }
 *     }
 *   },
 *   "included": [
 *     {
 *       "id": 5,
 *       "type": "images",
 *       "attributes": {
 *         "url": "http://"
 *       }
 *     }
 *   ]
 * }
 */
