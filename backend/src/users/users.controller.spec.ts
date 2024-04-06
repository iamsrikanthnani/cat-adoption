import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Role } from "./entities/user.entity";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findOne", () => {
    it("should return a user when a valid email is provided", async () => {
      // Mock the findOneByEmail method of the service
      const email = "test@example.com";
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: Role.User,
        createdAt: new Date(),
      };
      jest.spyOn(service, "findOneByEmail").mockResolvedValue(user);

      // Call the controller method
      const result = await controller.findOne(email);

      // Verify the result
      expect(result).toEqual(user);
    });

    it("should throw an error when an invalid email is provided", async () => {
      // Mock the findOneByEmail method of the service to throw an error
      const email = "invalid-email";
      jest
        .spyOn(service, "findOneByEmail")
        .mockRejectedValue(new Error("Invalid email"));

      // Call the controller method and expect it to throw an error
      await expect(controller.findOne(email)).rejects.toThrowError(
        "Invalid email"
      );
    });
  });
});
