import { OrderEntity } from '../../../domain/entities/order.entity';
import OrderModel from './order.model';

export class OrderModelMapper {
  static toModel(entity: OrderEntity) {
    console.log(entity);

    return OrderModel.build({
      id: entity.id ?? null,
      description: entity.description,
      public_id: entity.public_id.value,
    });
  }

  static toEntity(model: OrderModel) {
    return new OrderEntity({
      id: model.id,
      description: model.description,
      public_id: model.public_id,
    });
  }
}
