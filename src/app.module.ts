import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './nest-modules/order-module/order.module';
import { ConfigModule } from './nest-modules/config-module/config.module';
import { DatabaseModule } from './nest-modules/database-module/database-module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
