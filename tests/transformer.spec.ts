/* tslint:disable:max-classes-per-file */

import { transform, whitelist, DefaultTransformer, Transformer } from '../src'

type Product = {
  _id: number
  name: string
}

type Order = {
  _id: number
  product: Product
}

type User = {
  _id: number
  firstName: string
  lastName: string
  companyId: number
  commentIds: number[]
  orders: Order[]
}

class OrderTransformer extends Transformer<Order, unknown> {
  constructor() {
    super()

    this.type = 'orders'
    this.relationships = {
      product: this.product,
    }
  }

  transform(order: Order) {
    return { _id: order._id }
  }

  product(order: Order) {
    return transform()
      .withInput(order.product)
      .withTransformer(new DefaultTransformer('products'))
      .withIncluded(true)
      .toContext()
  }
}

class UserTransformer extends Transformer<User, unknown> {
  constructor() {
    super()
    this.type = 'users'
    this.relationships = {
      company: this.company,
      comments: this.comments,
      orders: this.orders,
    }
  }

  transform(user: User) {
    return whitelist(user, ['_id', 'firstName', 'lastName'])
  }

  orders(user: User) {
    return transform().withInput(user.orders).withTransformer(new OrderTransformer()).withIncluded(true).toContext()
  }

  company(user: User) {
    return transform()
      .withInput({ _id: user.companyId })
      .withTransformer(new DefaultTransformer('companies'))
      .withIncluded(false)
      .toContext()
  }

  comments(user: User) {
    return transform()
      .withInput(user.commentIds.map((id) => ({ _id: id })))
      .withTransformer(new DefaultTransformer('comments'))
      .withIncluded(false)
      .toContext()
  }
}

describe('transform', () => {
  it('should serialize with a custom transformer and included transformation', () => {
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
            name: 'My product',
          },
        },
      ],
    }

    const entitySerialized = transform()
      .withInput(entity)
      .withTransformer(new UserTransformer())
      .withOptions({ idKey: '_id' })
      .serialize()

    expect(entitySerialized).toStrictEqual({
      data: {
        type: 'users',
        id: 1,
        attributes: {
          firstName: 'Joe',
          lastName: 'Doe',
        },
        relationships: {
          company: {
            data: {
              id: 3,
              type: 'companies',
            },
          },
          comments: {
            data: [
              { id: 1, type: 'comments' },
              { id: 2, type: 'comments' },
              { id: 3, type: 'comments' },
            ],
          },
          orders: {
            data: [{ id: 2, type: 'orders' }],
          },
        },
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
                type: 'products',
              },
            },
          },
        },
        {
          id: 1,
          type: 'products',
          attributes: {
            name: 'My product',
          },
        },
      ],
    })
  })
})
