import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0, max: 5, default: 0 })
  rating: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);