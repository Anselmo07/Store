// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { products } from './data/products.data';

@Injectable()
export class ProductService {
  findAll() {
    return products;
  }

  findById(id: number) {
    return products.find((p) => p.id === id);
  }

  findByCategory(category: string) {
    return products.filter((p) => p.category === category);
  }
}
