import {
  IOrderRepository,
  OrderInputParams,
  OrderOutputParams,
} from '../../../domain/contracts/transaction.inteface';
import OrderModel from '../models/order.model';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { Uuid } from '../../../../@shared/domain/value-objects/uuid.vo';
import { NotFoundError } from '../../../../@shared/domain/errors/not-found.error';
import { OrderModelMapper } from '../models/order.model.mapper';
import { Op, literal } from 'sequelize';
import { InputParamsDirection } from '../../../../@shared/domain/contracts/input-params';

export class OrderRepository implements IOrderRepository {
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    mysql: {
      name: (sort_dir: InputParamsDirection) =>
        literal(`binary name ${sort_dir}`), //ascii
    },
  };

  constructor(private model: typeof OrderModel) {}

  async index(props: OrderInputParams): Promise<OrderOutputParams> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows: entities, count } = await this.model.findAndCountAll({
      ...(props.filter && {
        where: {
          public_id: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? // { order: [[props.sort, props.sort_dir]] }
          { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });

    return new OrderOutputParams({
      items: entities.map((entity) => {
        return OrderModelMapper.toEntity(entity);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  async store(entity: OrderEntity): Promise<void> {
    await this.model.create(OrderModelMapper.toModel(entity).toJSON());
  }

  async show(entity_id: Uuid): Promise<OrderEntity | null> {
    const entity = await this.model.findOne({
      where: { public_id: entity_id.value },
    });

    return entity ? OrderModelMapper.toEntity(entity) : null;
  }

  async update(entity: OrderEntity): Promise<void> {
    const [affectedCount] = await this.model.update(
      OrderModelMapper.toModel(entity).toJSON(),
      {
        where: { public_id: entity.public_id.value },
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundError(entity.public_id.value, this.entity);
    }
  }

  async delete(entity_id: Uuid): Promise<void> {
    const affectedCount = await this.model.destroy({
      where: { public_id: entity_id.value },
    });

    if (affectedCount === 0) {
      throw new NotFoundError(entity_id.value, this.entity);
    }
  }

  private formatSort(sort: string, sort_dir: InputParamsDirection) {
    const dialect = this.model.sequelize!.getDialect() as 'mysql';
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  get entity(): new (...args: any[]) => OrderEntity {
    return OrderEntity;
  }
}
