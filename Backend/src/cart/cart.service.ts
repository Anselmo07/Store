// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  private cart: { id: number; name: string; price: number }[] = [];

  constructor(private readonly productService: ProductService) {}

  addProduct(id: number) {
    const product = this.productService.findById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    this.cart.push(product);
    return product;
  }

  getCart() {
    const total = this.cart.reduce((sum, item) => sum + item.price, 0);

    return {
      items: this.cart,
      total,
    };
  }

  removeProduct(id: number) {
    const index = this.cart.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Producto no está en el carrito');
    }
    const removed = this.cart.splice(index, 1)[0];
    return {
      message: 'Producto eliminado del carrito',
      removed,
    };
  }
}
