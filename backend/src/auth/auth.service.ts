import { Injectable } from "@nestjs/common";
import { RegisterDto, LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor() {}

  async register(dto: RegisterDto) {
    const { name, email, password, role } = dto;
    return dto;
  }

  async login(dto: LoginDto) {
    const { email, password, ...rest } = dto;
    return dto;
  }
}
