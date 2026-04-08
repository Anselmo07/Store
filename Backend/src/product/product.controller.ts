import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.productService.findAll(category);
  }
}
