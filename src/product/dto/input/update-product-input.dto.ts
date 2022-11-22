import { IsOptional, IsString } from 'class-validator';

export class UpdateProductInput {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image: string;
}
