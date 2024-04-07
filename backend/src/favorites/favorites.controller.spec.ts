import { Test, TestingModule } from "@nestjs/testing";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto, DeleteFavoriteDto } from "./dto";
import { Favorite } from "./entities/favorite.entity";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@/common/guards/auth.guard";
import { UsersService } from "@/users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "@/users/entities/user.entity";
import { Repository } from "typeorm";

describe("FavoritesController", () => {
  let controller: FavoritesController;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        FavoritesService,
        JwtService,
        AuthGuard,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Favorite),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    favoritesService = module.get<FavoritesService>(FavoritesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a favorite cat", async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        catId: 1,
        userId: 1,
      };
      const mockFavorite: Favorite = {
        id: 1,
        catId: 1,
        userId: 1,
      };
      jest
        .spyOn(favoritesService, "create")
        .mockResolvedValueOnce(mockFavorite);

      const result = await controller.create(createFavoriteDto, {
        user: { id: createFavoriteDto.userId },
      });

      expect(result).toEqual(mockFavorite);
    });
  });

  describe("remove", () => {
    it("should remove a favorite cat", async () => {
      const deleteFavoriteDto: DeleteFavoriteDto = {
        id: 1,
      };
      const mockFavorite: Favorite = {
        id: 1,
        catId: 1,
        userId: 1,
      };
      jest
        .spyOn(favoritesService, "remove")
        .mockResolvedValueOnce({ message: "deleted successfully" });

      const result = await controller.remove(deleteFavoriteDto);

      expect(result).toEqual({ message: "deleted successfully" });
    });
  });

  describe("findByUserIdWithFavoriteCats", () => {
    it("should fetch favorite cats by user ID", async () => {
      const userId = 1;
      const mockFavoriteCats: Favorite[] = [
        {
          id: 1,
          catId: 1,
          userId: userId,
        },
        {
          id: 2,
          catId: 2,
          userId: userId,
        },
      ];

      jest
        .spyOn(favoritesService, "findByUserIdWithFavoriteCats")
        .mockResolvedValueOnce({ favorites: mockFavoriteCats });

      const result = await controller.findByUserIdWithFavoriteCats({
        user: { id: userId },
      });

      expect(result.favorites).toEqual(mockFavoriteCats);
    });
  });
});
