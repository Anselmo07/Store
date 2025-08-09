// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';

@Module({
  controllers: [ProductController, CartController],
  providers: [ProductService, CartService],
})
export class AppModule {}
