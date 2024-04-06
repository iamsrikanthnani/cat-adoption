import { Role } from "@/common/entities/role.entity";
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password cannot be longer than 20 characters" })
  password: string;

  @IsEnum(Role, {
    message: "Invalid role!",
  })
  role: Role;
}
