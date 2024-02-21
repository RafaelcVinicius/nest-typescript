import { InputParams } from '../../../@shared/domain/contracts/input-params';
import { OutputParams } from '../../../@shared/domain/contracts/output-params';
import { OrderEntity } from '../entities/order.entity';
import { BaseRepositoryInterface } from '../../../@shared/domain/contracts/base-repository.interface';
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';

export type OrderFilter = string;

export class OrderInputParams extends InputParams<OrderFilter> {}

export class OrderOutputParams extends OutputParams<OrderEntity> {}

export interface IOrderRepository
  extends BaseRepositoryInterface<
    OrderEntity,
    Uuid,
    OrderFilter,
    OrderInputParams,
    OrderOutputParams
  > {}
