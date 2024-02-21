import { OrderOutput } from 'src/@core/order/application/use_cases/@shared/order_output';
import { CollectionPresenter } from '../shared-module/collection.presenter';
import { ListOrderOutput } from 'src/@core/order/application/use_cases/index/index_order.s.use-case';

export class OrderPresenter {
  id: string;
  description: string;

  constructor(output: OrderOutput) {
    this.id = output.id;
    this.description = output.description;
  }
}

export class OrderCollectionPresenter extends CollectionPresenter {
  data: OrderPresenter[];

  constructor(output: ListOrderOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new OrderPresenter(i));
  }
}
