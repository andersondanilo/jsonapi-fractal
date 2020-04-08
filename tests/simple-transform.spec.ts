import { transform, Transformer } from '../src/index'

interface User {
  id: number,
  firstName: string,
  lastName: string
}

class EntityTransformer extends Transformer {
  type = 'users';

  transform (user: User) {
    return user;
  }
}

describe('transform', () => {
  it('Do simple transformation', () => {
    const entity: User = {
      id: 1,
      firstName: "Joe",
      lastName: "Doe"
    };

    const collection = [entity];

    const entitySerialized = transform()
      .withInput(entity)
      .withTransformer(new EntityTransformer)
      .serialize();

    expect(entitySerialized).toEqual({
      data: {
        type: "users",
        id: 1,
        attributes: {
          firstName: "Joe",
          lastName: "Doe"
        }
      }
    });

    const collectionSerialized = transform()
      .withInput(collection)
      .withTransformer(new EntityTransformer)
      .serialize();

    expect(collectionSerialized).toEqual({
      data: [{
        type: "users",
        id: 1,
        attributes: {
          firstName: "Joe",
          lastName: "Doe"
        }
      }]
    });
  })
});
