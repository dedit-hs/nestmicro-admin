import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetProductArgs {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  _id: string;
}
