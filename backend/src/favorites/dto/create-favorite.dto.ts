import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  catId: number;
}
