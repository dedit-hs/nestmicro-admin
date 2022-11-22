import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { GetProductArgs } from './dto/args/get-product-args.dto';
import { CreateProductInput } from './dto/input/create-product-input.dto';
import { UpdateProductInput } from './dto/input/update-product-input.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async all() {
    return this.productService.getAllProducts();
  }

  @Get(':_id')
  async getProduct(@Param() getProductArgs: GetProductArgs) {
    return this.productService.getProduct(getProductArgs);
  }

  @Post()
  async create(
    @Body() createProductData: CreateProductInput,
    @Body('likes') likes: number,
  ) {
    const product = await this.productService.createProduct(
      { ...createProductData },
      likes,
    );
    this.client.emit('product_created', product);
    return product;
  }

  @Put(':_id')
  async update(
    @Param() getProductArgs: GetProductArgs,
    @Body() productUpdate: UpdateProductInput,
  ) {
    await this.productService.updateProduct(getProductArgs, {
      ...productUpdate,
    });

    const product = await this.productService.getProduct(getProductArgs);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':_id')
  async delete(@Param() getProductArgs: GetProductArgs) {
    await this.productService.deleteProduct(getProductArgs);

    this.client.emit('product_deleted', getProductArgs);
  }

  @EventPattern('product_liked')
  async like(product: any) {
    await this.productService.updateLike(product._id, {
      likes: product.likes,
    });
  }
}
