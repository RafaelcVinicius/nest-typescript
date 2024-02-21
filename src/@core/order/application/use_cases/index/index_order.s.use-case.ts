// import { UseCaseInterface } from '../../../../@shared/application/use-case.interface';
// import {
//   IOrderRepository,
//   OrderFilter,
//   OrderInputParams,
//   OrderOutputParams,
// } from '../../../domain/contracts/transaction.inteface';
// import { OrderOutput, OrderOutputMapper } from '../@shared/order_output';
// import {
//   PaginationOutput,
//   PaginationOutputMapper,
// } from '../../../../@shared/application/pagination-output';
// import { InputParamsDirection } from '../../../../@shared/domain/contracts/input-params';

// export class IndexOrderUseCase
//   implements UseCaseInterface<ListOrderInput, ListOrderOutput>
// {
//   constructor(private orderRepo: IOrderRepository) {}

//   async execute(input: ListOrderInput): Promise<ListOrderOutput> {
//     const params = new OrderInputParams(input);
//     const searchResult = await this.orderRepo.index(params);
//     return this.toOutput(searchResult);
//   }

//   private toOutput(searchResult: OrderOutputParams): ListOrderOutput {
//     const { items: _items } = searchResult;
//     const items = _items.map((i) => {
//       return OrderOutputMapper.toOutput(i);
//     });
//     return PaginationOutputMapper.toOutput(items, searchResult);
//   }
// }

// export type ListOrderInput = {
//   page?: number;
//   per_page?: number;
//   sort?: string | null;
//   sort_dir?: InputParamsDirection | null;
//   filter?: OrderFilter | null;
// };

// export type ListOrderOutput = PaginationOutput<OrderOutput>;
