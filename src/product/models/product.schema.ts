import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
