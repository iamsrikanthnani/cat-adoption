import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto, RegisterDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Service for managing user data.
    private jwtService: JwtService // Service for JWT operations.
  ) {}

  async register(dto: RegisterDto) {
    try {
      const { name, email, password, role } = dto;

      // Check if the user already exists
      const existingUser = await this.usersService.findOneByEmail(email);
      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await this.usersService.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // Generate JWT token for the user
      const payload = { id: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      // Omit password from user object
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      // Return JWT token and user information
      return {
        accessToken,
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: "User with this email already exists",
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async login(dto: LoginDto) {
    const { email, password, ...rest } = dto;

    // Check if there are any extra fields present in the DTO
    if (Object.keys(rest).length > 0) {
      throw new BadRequestException(
        "Invalid entries, only email and password are allowed"
      );
    }
    // Find user by email
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        "Invalid password!",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    // Generate JWT token for the user
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    // Omit password from user object
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    // Return JWT token and user information
    return {
      accessToken,
      user: userWithoutPassword,
    };
  }

  // Validate user based on email
  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    return user;
  }
}
