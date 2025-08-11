// src/cart/cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Post()
  addToCart(@Body('id') id: number) {
    return this.cartService.addProduct(id);
  }

  @Delete(':id')
  removeFromCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeProduct(id);
  }
}
