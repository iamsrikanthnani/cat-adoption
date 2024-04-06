import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { Role } from "@/common/entities/role.entity";
import { UsersService } from "../users/users.service"; // Import UsersService
import { JwtService } from "@nestjs/jwt"; // Import JwtService

// Define a mock repository
class MockUserRepository {}

describe("AuthService", () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        JwtService,
        // Provide the mock repository
        { provide: "UserRepository", useClass: MockUserRepository },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const registerDto: RegisterDto = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: Role.User,
      };

      const result = {
        accessToken: "generated-access-token",
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: "hashedPassword",
          role: Role.User,
          createdAt: new Date(),
        },
      };

      jest.spyOn(authService, "register").mockResolvedValue(result);

      expect(await controller.register(registerDto)).toEqual(result);
    });

    it("should throw ConflictException if user already exists", async () => {
      const registerDto: RegisterDto = {
        name: "Existing User",
        email: "existing@example.com",
        password: "existingpassword",
        role: Role.User,
      };

      jest
        .spyOn(authService, "register")
        .mockRejectedValue(new ConflictException());

      await expect(controller.register(registerDto)).rejects.toThrowError(
        ConflictException
      );
    });

    it("should throw HttpException for other errors", async () => {
      const registerDto: RegisterDto = {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
        role: Role.User,
      };

      jest
        .spyOn(authService, "register")
        .mockRejectedValue(
          new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        );

      await expect(controller.register(registerDto)).rejects.toThrowError(
        HttpException
      );
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const loginDto: LoginDto = {
        email: "john@example.com",
        password: "password123",
      };

      const result = {
        accessToken: "generated-access-token",
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: "hashedPassword",
          role: Role.User,
          createdAt: new Date(),
        },
      };

      jest.spyOn(authService, "login").mockResolvedValue(result);

      expect(await controller.login(loginDto)).toEqual(result);
    });

    it("should throw HttpException if user not found", async () => {
      const loginDto: LoginDto = {
        email: "nonexisting@example.com",
        password: "password123",
      };

      jest
        .spyOn(authService, "login")
        .mockRejectedValue(
          new HttpException("User not found", HttpStatus.NOT_FOUND)
        );

      await expect(controller.login(loginDto)).rejects.toThrowError(
        HttpException
      );
    });

    it("should throw HttpException if password is invalid", async () => {
      const loginDto: LoginDto = {
        email: "john@example.com",
        password: "invalidpassword",
      };

      jest
        .spyOn(authService, "login")
        .mockRejectedValue(
          new HttpException(
            "Invalid password",
            HttpStatus.INTERNAL_SERVER_ERROR
          )
        );

      await expect(controller.login(loginDto)).rejects.toThrowError(
        HttpException
      );
    });

    it("should throw BadRequestException if extra fields are present in DTO", async () => {
      const loginDto: LoginDto = {
        email: "john@example.com",
        password: "password123",
        // @ts-ignore
        name: "extra",
      };

      await expect(controller.login(loginDto)).rejects.toThrowError(
        BadRequestException
      );
    });
  });
});
