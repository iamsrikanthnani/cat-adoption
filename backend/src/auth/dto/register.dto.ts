import { Role } from "@/common/entities/role.entity";
import { IsNotEmpty, IsEmail, IsString, IsEnum } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
