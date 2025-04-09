import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<{ products: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(),
    ]);

    return { products, total };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto, imageUrl?: string): Promise<Product> {
    const productData = { ...createProductDto };
    if (imageUrl) {
      productData.image = imageUrl;
    }
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto, imageUrl?: string): Promise<Product> {
    const updateData = { ...updateProductDto };
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}