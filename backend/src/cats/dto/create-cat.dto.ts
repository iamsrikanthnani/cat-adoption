import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { Gender } from "./gender.enum";
import { User } from "@/users/entities/user.entity";

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  breed: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];
}
