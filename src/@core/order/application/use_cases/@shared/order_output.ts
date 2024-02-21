import { OrderEntity } from '../../../domain/entities/order.entity';
import _ from 'lodash';

export type OrderOutput = {
  id: string;
  description: string;
};

export class OrderOutputMapper {
  static toOutput(entity: OrderEntity): OrderOutput {
    const { public_id, ...otherData } = _.omit(entity.toJSON(), ['id']);

    return {
      id: public_id,
      ...otherData,
    };
  }
}
