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
}
