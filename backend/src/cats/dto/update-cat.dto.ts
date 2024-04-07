import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { Gender } from "./gender.enum";
import { User } from "@/users/entities/user.entity";

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  images: string[];
}
