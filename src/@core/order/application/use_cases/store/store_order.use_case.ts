import { StoreOrderInput } from './store_order.input';
import { OrderOutput, OrderOutputMapper } from '../@shared/order_output';
import { IOrderRepository } from '../../../../order/domain/contracts/transaction.inteface';
import { UseCaseInterface } from '../../../../@shared/application/use-case.interface';
import { OrderEntity } from '../../../../order/domain/entities/order.entity';

export class StoreOrderUseCase
  implements UseCaseInterface<StoreOrderInput, OrderOutput>
{
  constructor(private _repository: IOrderRepository) {}
  async execute(input: StoreOrderInput): Promise<OrderOutput> {
    const order = OrderEntity.create({
      description: input.description,
    });

    await this._repository.store(order);

    return OrderOutputMapper.toOutput(order);
  }
}
