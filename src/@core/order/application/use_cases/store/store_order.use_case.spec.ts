import { OrderRepository } from '../../../../order/infra/db/repositories/order.repository';
import { StoreOrderUseCase } from './store_order.use_case';
import OrderModel from '../../../../order/infra/db/models/order.model';
import { StoreOrderInput } from './store_order.input';
import { setupSequelize } from '../../../../@shared/infra/db/testing/helper';

describe('Order use case unit tests', () => {
  let useCase: StoreOrderUseCase;
  let repository: OrderRepository;

  setupSequelize();

  beforeEach(() => {
    repository = new OrderRepository(OrderModel);
    useCase = new StoreOrderUseCase(repository);
  });

  it('Should create a order', async () => {
    const input = {
      description: 'teste',
    } as StoreOrderInput;

    const output = await useCase.execute(input);

    expect(output).toStrictEqual({
      description: 'teste',
      id: output.id,
    });
  });
});
