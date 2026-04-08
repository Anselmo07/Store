import { Injectable } from '@nestjs/common';
import { products } from './data/products.data';

@Injectable()
export class ProductService {
  findAll(category?: string) {
    if (category) {
      return products.filter((product) => product.category === category);
    }

    return products;
  }

  findById(id: number) {
    return products.find((p) => p.id === id);
  }
}
