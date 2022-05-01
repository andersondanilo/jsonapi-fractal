const { serialize, CaseType } = require('jsonapi-fractal')

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
  changeCase: CaseType.kebabCase,
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
