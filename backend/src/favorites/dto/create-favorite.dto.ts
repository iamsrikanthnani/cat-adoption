import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class CreateFavoriteDto {
  @ValidateNested()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  catId: number;
}
