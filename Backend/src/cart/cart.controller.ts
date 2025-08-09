// src/cart/cart.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
