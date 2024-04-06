import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role, User } from "./entities/user.entity";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOneByEmail", () => {
    it("should return a user if it exists", async () => {
      const mockUser: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
        role: Role.User,
        createdAt: new Date(),
      };
      jest.spyOn(service, "findOneByEmail").mockResolvedValue(mockUser);

      const foundUser = await service.findOneByEmail("test@example.com");

      expect(foundUser).toEqual(mockUser);
    });

    it("should return undefined if user does not exist", async () => {
      jest.spyOn(service, "findOneByEmail").mockResolvedValue(undefined);

      const foundUser = await service.findOneByEmail("nonexistent@example.com");

      expect(foundUser).toBeUndefined();
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const mockUser: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashedPassword",
        role: Role.User,
        createdAt: new Date(),
      };
      jest.spyOn(service, "create").mockResolvedValue(mockUser);

      const newUser = await service.create(mockUser);

      expect(newUser).toEqual(mockUser);
    });
  });
});
