import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetOneProductDto } from './dto/get.detail.product.dto';
import { GetProductDTO } from './dto/get.all.product.dto';

@Controller('product')
// Todo 유효성 검사 파이프 적용, DTO에 정의된 규칙에 맞는지 검사
@UsePipes(new ValidationPipe())
export class ProductController {
  constructor(private productService: ProductService) {}

  //* 상품 전체 조회
  @Get()
  getAllProducts(): Promise<object> {
    return this.productService.getAllProducts();
  }

  //* 상품 상위10개 조회
  @Get('top')
  async getTopDiscountedProducts(): Promise<object> {
    return this.productService.getTop10Products();
  }

  //* 상품 카테고리별 조회
  @Get('category/:categoryName')
  async getProductsByCategory(
    @Param('categoryName') categoryName: string
  ): Promise<object> {
    return this.productService.getProductsByCategory(categoryName);
  }

  //* 상품 카테고리별 필터기능 조회
  @Get('category/:categoryName/:filter')
  async getProductsByCategoryAndFilter(
    @Param('categoryName') categoryName: string,
    @Param('filter') filter: string
  ): Promise<object> {
    return this.productService.getProductsByCategoryAndFilter(
      categoryName,
      filter
    );
  }

  //* 상품 상세 조회
  @Get(':productId')
  async getProductDetail(
    @Param('productId', ParseIntPipe) productId: number
  ): Promise<object> {
    const result = await this.productService.getProductDetail(productId);

    return result;
  }
}
