// import { OrderRepository } from '../../../../order/infra/db/repositories/order.repository';
// import OrderModel from '../../../../order/infra/db/models/order.model';
// import { setupSequelize } from '../../../../@shared/infra/db/testing/helper';
// import { StoreOrderUseCase } from '../store/store_order.use_case';
// import { StoreOrderInput } from '../store/store_order.input';
// import { IndexOrderUseCase, ListOrderInput } from './index_order.s.use-case';

// describe('Order use case unit tests', () => {
//   let useCase: StoreOrderUseCase;
//   let indexUseCase: IndexOrderUseCase;
//   let repository: OrderRepository;

//   setupSequelize();

//   beforeEach(() => {
//     repository = new OrderRepository(OrderModel);
//     useCase = new StoreOrderUseCase(repository);
//     indexUseCase = new IndexOrderUseCase(repository);
//   });

//   it('Should create a order', async () => {
//     const input = {
//       description: 'teste',
//     } as StoreOrderInput;

//     const output = await useCase.execute(input);

//     const InputParams = {} as ListOrderInput;

//     const outputResult = await indexUseCase.execute(InputParams);

//     console.log(outputResult);

//     expect(output).toStrictEqual({
//       description: 'teste',
//       id: output.id,
//     });
//   });
// });
