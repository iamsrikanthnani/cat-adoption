import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  catId: number;
}
