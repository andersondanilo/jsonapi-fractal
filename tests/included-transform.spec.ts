/* tslint:disable:max-classes-per-file */

import { transform, whitelist, DefaultTransformer, Transformer } from '../src/index'

interface Product {
  _id: number;
  name: string;
}

interface Order {
  _id: number,
  product: Product;
}

interface User {
  _id: number,
  firstName: string,
  lastName: string
  companyId: number,
  commentIds: number[],
  orders: Order[]
}

class OrderTransformer extends Transformer {
  type = 'orders';
  relationships = ['product']

  transform (order: Order) {
    return { _id: order._id }
  }

  product (order: Order) {
    return transform()
      .withInput(order.product)
      .withTransformer(new DefaultTransformer('products'))
      .withIncluded(true)
  }
}

class UserTransformer extends Transformer {
  type = 'users';
  relationships = ['company', 'comments', 'orders'];

  transform (user: User) {
    return whitelist(user, ['_id', 'firstName', 'lastName']);
  }

  orders (user: User) {
    return transform()
      .withInput(user.orders)
      .withTransformer(new OrderTransformer())
      .withIncluded(true)
  }

  company (user: User) {
    return transform()
      .withInput({ _id: user.companyId })
      .withTransformer(new DefaultTransformer('companies'))
      .withIncluded(false)
  }

  comments (user: User) {
    return transform()
      .withInput(user.commentIds.map((id) => ({ _id: id })))
      .withTransformer(new DefaultTransformer('comments'))
      .withIncluded(false)
  }
}

describe('transform', () => {
  it('Included transformation', () => {
    const entity: User = {
      _id: 1,
      firstName: 'Joe',
      lastName: 'Doe',
      companyId: 3,
      commentIds: [1, 2, 3],
      orders: [
        {
          _id: 2,
          product: {
            _id: 1,
            name: 'My product'
          }
        }
      ]
    };

    const collection = [entity];

    const entitySerialized = transform()
      .withInput(entity)
      .withTransformer(new UserTransformer())
      .withOptions({ idKey: '_id' })
      .serialize();

    expect(entitySerialized).toEqual({
      data: {
        type: 'users',
        id: 1,
        attributes: {
          firstName: 'Joe',
          lastName: 'Doe'
        },
        relationships: {
          company: {
            data: {
              id: 3,
              type: 'companies'
            }
          },
          comments: {
            data: [
              { id: 1, type: 'comments' },
              { id: 2, type: 'comments' },
              { id: 3, type: 'comments' }
            ]
          },
          orders: {
            data: [
              { id: 2, type: 'orders' }
            ]
          }
        }
      },
      included: [
        {
          id: 2,
          type: 'orders',
          attributes: {},
          relationships: {
            product: {
              data: {
                id: 1,
                type: 'products'
              }
            }
          }
        },
        {
          id: 1,
          type: 'products',
          attributes: {
            name: 'My product'
          }
        }
      ]
    });

    // const collectionSerialized = transform()
    //   .withInput(collection)
    //   .withTransformer(new UserTransformer)
    //   .withOptions({ idKey: '_id' })
    //   .serialize();

    // expect(collectionSerialized).toEqual({
    //   data: [{
    //     type: "users",
    //     id: 1,
    //     attributes: {
    //       firstName: "Joe",
    //       lastName: "Doe"
    //     }
    //   }]
    // });
  })
});
