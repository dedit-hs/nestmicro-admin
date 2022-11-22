import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;
}
