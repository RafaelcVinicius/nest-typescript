import { Module } from '@nestjs/common';
import OrderModel from '../../@core/order/infra/db/models/order.model';
import { OrderController } from './order.controller';
import { ORDER_PROVIDERS } from './order.providers';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  controllers: [OrderController],
  providers: [
    ...Object.values(ORDER_PROVIDERS.REPOSITORIES),
    ...Object.values(ORDER_PROVIDERS.USE_CASES),
  ],
  exports: [ORDER_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide],
})
export class OrderModule {}
