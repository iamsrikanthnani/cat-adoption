import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Role, User } from "@/users/entities/user.entity";
import { Repository } from "typeorm";
import { AuthController } from "./auth.controller";

// Define a mock repository
class MockUserRepository {}

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

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

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const dto = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        role: Role.User,
        createdAt: new Date(),
      };

      const hashedPassword = "hashedPassword";
      const user = { id: 1, ...dto, password: hashedPassword };
      const accessToken = "accessToken";

      jest.spyOn(usersService, "findOneByEmail").mockResolvedValueOnce(null);
      jest.spyOn(usersService, "create").mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce(hashedPassword);
      jest.spyOn(jwtService, "sign").mockReturnValueOnce(accessToken);

      const result = await authService.register(dto);

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(usersService.create).toHaveBeenCalledWith({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: user.id,
        email: user.email,
      });
      expect(result).toEqual({
        accessToken,
        user: { ...user, password: undefined },
      });
    });

    it("should throw ConflictException if user already exists", async () => {
      const dto = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
        role: Role.User,
        createdAt: new Date(),
      };

      jest.spyOn(usersService, "findOneByEmail").mockResolvedValueOnce(dto);

      await expect(authService.register(dto)).rejects.toThrowError(
        new ConflictException("User with this email already exists")
      );
    });

    it("should throw HttpException on error", async () => {
      const dto = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
        role: Role.User,
        createdAt: new Date(),
      };

      jest
        .spyOn(usersService, "findOneByEmail")
        .mockRejectedValueOnce(new Error("Something went wrong"));

      await expect(authService.register(dto)).rejects.toThrowError(
        new HttpException(
          {
            message: "User with this email already exists",
            error: "Something went wrong",
          },
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("login", () => {
    it("should login with valid credentials", async () => {
      const hashedPassword = "hashedPassword";
      const plainTextPassword = "plainTextPassword";

      const dto = {
        email: "john@example.com",
        password: plainTextPassword,
      };

      const user = {
        id: 1,
        name: "Test User",
        email: dto.email,
        password: hashedPassword,
        role: Role.User,
        createdAt: new Date(),
      };
      const accessToken = "accessToken";

      // Mock the findOneByEmail method to return the user
      jest.spyOn(usersService, "findOneByEmail").mockResolvedValueOnce(user);

      // Mock the compare method of bcrypt to return false, indicating password mismatch
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);

      try {
        await authService.login(dto);
      } catch (error) {
        // Assert that HttpException is thrown with the correct message and status code
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual("Invalid password!");
        expect(error.getStatus()).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Assert that findOneByEmail method is called with the correct email
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(dto.email);

      // Assert that compare method is called with the correct arguments
      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, user.password);
    });
  });

  describe("validateUser", () => {
    it("should validate user based on email", async () => {
      const email = "john@example.com";
      const user = {
        id: 1,
        email,
        name: "Jhon",
        password: "hashedPassword",
        role: Role.User,
        createdAt: new Date(),
      };

      jest.spyOn(usersService, "findOneByEmail").mockResolvedValueOnce(user);

      const result = await authService.validateUser(email);

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });
  });
});
