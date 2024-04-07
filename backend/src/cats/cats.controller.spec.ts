import { Test, TestingModule } from "@nestjs/testing";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Gender } from "./dto/gender.enum";
import { Role } from "@/common/entities/role.entity";
import { Cat } from "./entities/cat.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@/common/guards/auth.guard";
import { UsersService } from "@/users/users.service";
import { Repository } from "typeorm";
import { User } from "@/users/entities/user.entity";

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

  const req = {
    user: {
      id: 1,
      name: "John Doe",
      role: Role.Admin,
      email: "john@example.com",
      password: "password123",
      createdAt: new Date(),
    },
  };

  describe("create", () => {
    it("should create a cat", async () => {
      const createCatDto: CreateCatDto = {
        name: "Pixel",
        age: 2,
        breed: "Bombay",
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
      };

      const createdCat: Cat = {
        ...createCatDto,
        id: 1,
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
        user: req.user,
        favorites: [],
      };

      jest
        .spyOn(catsService, "create")
        .mockResolvedValue(Promise.resolve(createdCat));

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
          user: req.user,
          favorites: [],
        },
        // Add more cat objects as needed
      ];

      jest.spyOn(catsService, "findAll").mockResolvedValue(cats);

      expect(await catsController.findAll()).toEqual(cats);
    });
  });

  describe("findOne", () => {
    it("should return a single cat by id", async () => {
      const catId = "1";
      const cat: Cat = {
        id: 1,
        name: "Pixel",
        age: 2,
        breed: "Bombay",
        gender: Gender.Male,
        images: ["image1.jpg", "image2.jpg"],
        user: req.user,
        favorites: [],
      };

      jest.spyOn(catsService, "findOne").mockResolvedValue(cat);

      expect(await catsController.findOne(catId)).toEqual(cat);
    });
  });

  describe("update", () => {
    it("should update a cat by id", async () => {
      const catId = "1";
      const updateCatDto: UpdateCatDto = {
        name: "Updated Pixel",
        age: 3,
        breed: "Updated Bombay",
        gender: Gender.Female,
        images: ["updated-image1.jpg", "updated-image2.jpg"],
      };

      const updatedCat: Cat = {
        id: 1,
        ...updateCatDto,
        user: req.user,
        favorites: [],
      };

      jest.spyOn(catsService, "update").mockResolvedValue(updatedCat);

      expect(await catsController.update(catId, updateCatDto, req)).toEqual(
        updatedCat
      );
    });
  });

  describe("remove", () => {
    it("should remove a cat by id", async () => {
      const catId = "1";
      const removeMessage = { message: `Cat with ID ${catId} removed` };

      jest.spyOn(catsService, "remove").mockResolvedValue(removeMessage);

      expect(await catsController.remove(catId, req)).toEqual(removeMessage);
    });
  });
});
