import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrderOutput } from 'src/@core/order/application/use_cases/@shared/order_output';
import { StoreOrderUseCase } from 'src/@core/order/application/use_cases/store/store_order.use_case';
import { StoreOrderDto } from './dto/store-order.dto';
import { OrderPresenter } from './order.presenter';

@Controller('orders')
export class OrderController {
  @Inject(StoreOrderUseCase)
  private storeUseCase: StoreOrderUseCase;

  @Post()
  async create(@Body() storeOrderDto: StoreOrderDto) {
    const output = await this.storeUseCase.execute(storeOrderDto);
    return OrderController.serialize(output);
  }

  // @Get()
  // async search(@Query() searchParamsDto: SearchCategoriesDto) {
  //   const output = await this.listUseCase.execute(searchParamsDto);
  //   return new CategoryCollectionPresenter(output);
  // }

  // @Get(':id')
  // async findOne(
  //   @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  // ) {
  //   const output = await this.getUseCase.execute({ id });
  //   return CategoriesController.serialize(output);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   const output = await this.updateUseCase.execute({
  //     ...updateCategoryDto,
  //     id,
  //   });
  //   return CategoriesController.serialize(output);
  // }

  // @HttpCode(204)
  // @Delete(':id')
  // remove(
  //   @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  // ) {
  //   return this.deleteUseCase.execute({ id });
  // }

  static serialize(output: OrderOutput) {
    return new OrderPresenter(output);
  }
}
