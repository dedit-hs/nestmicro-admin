import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLikeInput {
  @IsOptional()
  @IsNumber()
  likes: number;
}
