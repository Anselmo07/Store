// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  private carts: Record<string, { id: number; name: string; price: number }[]> =
    {};

  constructor(private readonly productService: ProductService) {}

  private getUserCart(cartId: string) {
    if (!this.carts[cartId]) {
      this.carts[cartId] = [];
    }
    return this.carts[cartId];
  }

  addProduct(cartId: string, id: number) {
    const product = this.productService.findById(id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const cart = this.getUserCart(cartId);

    cart.push(product);

    return product;
  }

  getCart(cartId: string) {
    const cart = this.getUserCart(cartId);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return {
      items: cart,
      total,
    };
  }

  removeProduct(cartId: string, id: number) {
    const cart = this.getUserCart(cartId);

    const index = cart.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Producto no está en el carrito');
    }

    const removed = cart.splice(index, 1)[0];

    return {
      message: 'Producto eliminado del carrito',
      removed,
    };
  }
}
