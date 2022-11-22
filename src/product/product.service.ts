import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDocument } from './models/product.schema';
import { CreateProductInput } from './dto/input/create-product-input.dto';
import { GetProductArgs } from './dto/args/get-product-args.dto';
import { UpdateProductInput } from './dto/input/update-product-input.dto';
import { UpdateLikeInput } from './dto/input/update-like-input.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts() {
    const productDocuments = await this.productRepository.find({});
    return productDocuments.map((product) => this.toModel(product));
  }

  async getProduct(getProductArgs: GetProductArgs) {
    const productDocument = await this.productRepository.findOne({
      ...getProductArgs,
    });
    return this.toModel(productDocument);
  }

  async createProduct(createProductData: CreateProductInput, likes: number) {
    const productDocument = await this.productRepository.create({
      ...createProductData,
      likes,
    });
    return this.toModel(productDocument);
  }

  async updateProduct(
    getProductArgs: GetProductArgs,
    updateProduct: UpdateProductInput,
  ) {
    const productDocument = await this.productRepository.findOneAndUpdate(
      getProductArgs,
      { ...updateProduct },
    );
    return this.toModel(productDocument);
  }

  async updateLike(_id: GetProductArgs, updateLike: UpdateLikeInput) {
    const productDocument = await this.productRepository.findOneAndUpdate(
      { _id },
      {
        ...updateLike,
      },
    );
    return this.toModel(productDocument);
  }

  async deleteProduct(getProductArgs: GetProductArgs) {
    return this.productRepository.findOneAndDelete(getProductArgs);
  }

  private toModel(productDocument: ProductDocument) {
    return {
      _id: productDocument._id.toHexString(),
      ...productDocument,
    };
  }
}
