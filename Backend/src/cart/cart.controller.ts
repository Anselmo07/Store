// src/cart/cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Headers,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Headers('cart-id') cartId: string) {
    return this.cartService.getCart(cartId);
  }

  @Post()
  addToCart(@Headers('cart-id') cartId: string, @Body('id') id: number) {
    return this.cartService.addProduct(cartId, id);
  }

  @Delete(':id')
  removeFromCart(
    @Headers('cart-id') cartId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartService.removeProduct(cartId, id);
  }
}
