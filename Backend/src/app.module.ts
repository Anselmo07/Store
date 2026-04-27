// src/app.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  controllers: [ProductController, CartController],
  providers: [ProductService, CartService],
  imports: [PaymentsModule],
})
export class AppModule {}
