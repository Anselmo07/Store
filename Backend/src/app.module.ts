// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
// import { PaymentsModule } from './modules/payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';


@Module({
  controllers: [ProductController, CartController],
  providers: [ProductService, CartService],
  imports: [TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
    }), ],
})
export class AppModule {}
