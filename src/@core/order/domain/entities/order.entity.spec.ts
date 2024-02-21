import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { OrderEntity } from './order.entity';

describe('Create order entity unit tests', () => {
  const mockOrder = (): OrderEntity => {
    return OrderEntity.create({
      id: 1,
      public_id: new Uuid().value,
      description: 'teste',
    });
  };

  it('create order entity', () => {
    const order = mockOrder();

    expect(order?.toJSON()).toStrictEqual({
      id: 1,
      public_id: order.public_id.value,
      description: 'teste',
    });
  });
});
