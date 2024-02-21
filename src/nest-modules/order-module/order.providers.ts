import { getModelToken } from '@nestjs/sequelize';
import OrderModel from '../../@core/order/infra/db/models/order.model';
import { OrderRepository } from '../../@core/order/infra/db/repositories/order.repository';
import { StoreOrderUseCase } from '../../@core/order/application/use_cases/store/store_order.use_case';
import { IOrderRepository } from 'src/@core/order/domain/contracts/transaction.inteface';

export const REPOSITORIES = {
  CATEGORY_REPOSITORY: {
    provide: 'OrderRepository',
    useExisting: OrderRepository,
  },
  CATEGORY_SEQUELIZE_REPOSITORY: {
    provide: OrderRepository,
    useFactory: (orderModel: typeof OrderModel) => {
      return new OrderRepository(orderModel);
    },
    inject: [getModelToken(OrderModel)],
  },
};

export const USE_CASES = {
  CREATE_CATEGORY_USE_CASE: {
    provide: StoreOrderUseCase,
    useFactory: (orderRepo: IOrderRepository) => {
      return new StoreOrderUseCase(orderRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  // UPDATE_CATEGORY_USE_CASE: {
  //   provide: UpdateCategoryUseCase,
  //   useFactory: (categoryRepo: ICategoryRepository) => {
  //     return new UpdateCategoryUseCase(categoryRepo);
  //   },
  //   inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  // },
  // LIST_CATEGORIES_USE_CASE: {
  //   provide: ListCategoriesUseCase,
  //   useFactory: (categoryRepo: ICategoryRepository) => {
  //     return new ListCategoriesUseCase(categoryRepo);
  //   },
  //   inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  // },
  // GET_CATEGORY_USE_CASE: {
  //   provide: GetCategoryUseCase,
  //   useFactory: (categoryRepo: ICategoryRepository) => {
  //     return new GetCategoryUseCase(categoryRepo);
  //   },
  //   inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  // },
  // DELETE_CATEGORY_USE_CASE: {
  //   provide: DeleteCategoryUseCase,
  //   useFactory: (categoryRepo: ICategoryRepository) => {
  //     return new DeleteCategoryUseCase(categoryRepo);
  //   },
  //   inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  // },
};

export const ORDER_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
