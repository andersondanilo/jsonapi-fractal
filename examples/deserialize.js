const { deserialize, CaseType } = require('jsonapi-fractal')

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
const entity = deserialize(serializedData, { changeCase: CaseType.camelCase })

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
