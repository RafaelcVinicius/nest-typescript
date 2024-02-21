import { setupSequelize } from '../../../../@shared/infra/db/testing/helper';
import { OrderRepository } from './order.repository';
import OrderModel from '../models/order.model';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { OrderInputParams } from '../../../domain/contracts/transaction.inteface';

describe('Order repository integration tests', () => {
  let repository: OrderRepository;

  setupSequelize();

  const mockOrder = (): OrderEntity => {
    return OrderEntity.create({
      id: 1,
      public_id: new Uuid().value,
      description: 'teste',
    });
  };

  beforeEach(() => {
    repository = new OrderRepository(OrderModel);
  });

  it('Should insert a order', async () => {
    const entity = mockOrder();

    await repository.store(entity);

    const model = await repository.show(entity.public_id);

    expect(model).toBeDefined();
    expect(model!.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should only apply paginate when other params are null', async () => {
    const entity = mockOrder();

    await repository.store(entity);

    const searchOutput = await repository.index(new OrderInputParams());

    expect(searchOutput.toJSON()).toMatchObject({
      total: 16,
      current_page: 1,
      last_page: 2,
      per_page: 15,
    });
  });
});
