import { Test, TestingModule } from "@nestjs/testing";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./entities/cat.entity";
import { Gender } from "./dto/gender.enum";
import { Role } from "@/common/entities/role.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@/common/guards/auth.guard";
import { UsersService } from "@/users/users.service";
import { Repository } from "typeorm";
import { User } from "@/users/entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("CatsController", () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        JwtService,
        AuthGuard,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Cat),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe("create", () => {
    it("should create a cat", async () => {
      const createCatDto: CreateCatDto = {
        name: "Pixel",
        age: 2,
        breed: "Bombay",
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
      };

      const req = { user: { id: 1, name: "John Doe", role: Role.Admin } };

      const createdCat: Cat = {
        ...createCatDto,
        id: 1,
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
        user: { id: 1, name: "John Doe", role: Role.Admin },
      };

      jest.spyOn(catsService, "create").mockResolvedValue(createdCat);

      expect(await catsController.create(createCatDto, req)).toEqual(
        createdCat
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of cats", async () => {
      const cats: Cat[] = [
        {
          id: 1,
          name: "Pixel",
          age: 2,
          breed: "Bombay",
          gender: Gender.Male,
          images: ["image1.jpg", "image2.jpg"],
          user: { id: 1, name: "John Doe", role: Role.Admin },
        },
        {
          id: 2,
          name: "Whiskers",
          age: 3,
          breed: "Persian",
          gender: Gender.Female,
          images: ["image3.jpg", "image4.jpg"],
          user: { id: 2, name: "Jane Smith", role: Role.User },
        },
      ];

      jest.spyOn(catsService, "findAll").mockResolvedValue(cats);

      expect(await catsController.findAll()).toEqual(cats);
    });
  });

  describe("findOne", () => {
    it("should throw an error if cat with given ID is not found", async () => {
      const invalidCatId = 999;

      jest
        .spyOn(catsService, "findOne")
        .mockRejectedValue(
          new HttpException(
            `Cannot get cat. Cat with ID ${invalidCatId} not found.`,
            HttpStatus.NOT_FOUND
          )
        );

      // Expecting the findOne method to throw an error when called with invalidCatId
      await expect(
        catsController.findOne(`${invalidCatId}`)
      ).rejects.toThrowError(HttpException);
    });
  });

  describe("update", () => {
    it("should update a cat by ID", async () => {
      const catId = 1;
      const updateCatDto: UpdateCatDto = {
        name: "Updated Name",
        age: 3,
        breed: "Updated Breed",
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
      };

      const updatedCat: Cat = {
        id: catId,
        name: "Updated Name",
        age: 3,
        breed: "Updated Breed",
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
        user: { id: 1, name: "John Doe", role: Role.Admin },
      };

      const req = { user: { id: 1, name: "John Doe", role: Role.Admin } }; // Mock request object

      jest.spyOn(catsService, "update").mockResolvedValue(updatedCat);

      expect(
        await catsController.update(`${catId}`, updateCatDto, req)
      ).toEqual(updatedCat);
    });
  });

  describe("remove", () => {
    it("should remove a cat by ID", async () => {
      const catId = 1;

      jest
        .spyOn(catsService, "remove")
        .mockResolvedValue({ message: "Cat deleted successfully" });

      expect(await catsController.remove(`${catId}`)).toEqual({
        message: "Cat deleted successfully",
      });
    });
  });
});
