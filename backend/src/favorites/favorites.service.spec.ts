import { Test, TestingModule } from "@nestjs/testing";
import { FavoritesService } from "./favorites.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateFavoriteDto, DeleteFavoriteDto } from "./dto";
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { Cat } from "@/cats/entities/cat.entity";
import { Favorite } from "./entities/favorite.entity";

describe("FavoritesService", () => {
  let service: FavoritesService;
  let favoriteRepository: Repository<Favorite>;
  let catRepository: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    favoriteRepository = module.get<Repository<Favorite>>(
      getRepositoryToken(Favorite)
    );
    catRepository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("catExists", () => {
    it("should return true if the cat with the provided ID exists", async () => {
      // Mocking the catRepository findOne method to return a cat
      jest
        .spyOn(catRepository, "findOne")
        .mockResolvedValueOnce({ id: 1 } as Cat);

      const result = await service.catExists(1);

      expect(result).toBeTruthy();
      expect(catRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should return false if the cat with the provided ID does not exist", async () => {
      // Mocking the catRepository findOne method to return undefined
      jest.spyOn(catRepository, "findOne").mockResolvedValueOnce(undefined);

      const result = await service.catExists(1);

      expect(result).toBeFalsy();
      expect(catRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("findOne", () => {
    it("should return the favorite with the provided ID", async () => {
      const favoriteId = 1;
      // Mocking the favoriteRepository findOne method to return a favorite
      jest
        .spyOn(favoriteRepository, "findOne")
        .mockResolvedValueOnce({ id: favoriteId } as Favorite);

      const result = await service.findOne(favoriteId, "get");

      expect(result).toEqual({ id: favoriteId });
      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { id: favoriteId },
      });
    });

    it("should throw HttpException with status 404 if favorite with provided ID does not exist", async () => {
      // Mocking the favoriteRepository findOne method to return undefined
      jest
        .spyOn(favoriteRepository, "findOne")
        .mockResolvedValueOnce(undefined);

      await expect(service.findOne(1, "get")).rejects.toThrowError(
        new HttpException("Favorite with ID 1 not found.", HttpStatus.NOT_FOUND)
      );
      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("findByUserIdAndCatId", () => {
    it("should return the favorite for the provided user ID and cat ID", async () => {
      // Mocking the favoriteRepository findOne method to return a favorite
      jest
        .spyOn(favoriteRepository, "findOne")
        .mockResolvedValueOnce({} as Favorite);

      const result = await service.findByUserIdAndCatId(1, 1);

      expect(result).toBeDefined();
      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 1 }, cat: { id: 1 } },
      });
    });

    it("should return undefined if no favorite exists for the provided user ID and cat ID", async () => {
      // Mocking the favoriteRepository findOne method to return undefined
      jest
        .spyOn(favoriteRepository, "findOne")
        .mockResolvedValueOnce(undefined);

      const result = await service.findByUserIdAndCatId(1, 1);

      expect(result).toBeUndefined();
      expect(favoriteRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 1 }, cat: { id: 1 } },
      });
    });
  });

  describe("create", () => {
    it("should create a new favorite for the specified user and cat", async () => {
      const createFavoriteDto: CreateFavoriteDto = { catId: 1 };
      const userId = 1;
      const newFavorite = {
        id: 1,
        cat: { id: 1 },
        user: { id: 1 },
      } as Favorite;

      jest
        .spyOn(catRepository, "findOne")
        .mockResolvedValueOnce({ id: createFavoriteDto.catId } as Cat);
      jest
        .spyOn(service, "findByUserIdAndCatId")
        .mockResolvedValueOnce(undefined);
      jest.spyOn(favoriteRepository, "create").mockReturnValueOnce(newFavorite);
      jest.spyOn(favoriteRepository, "save").mockResolvedValueOnce(newFavorite);

      const result = await service.create(createFavoriteDto, userId);

      expect(result).toEqual(newFavorite);
      expect(catRepository.findOne).toHaveBeenCalledWith({
        where: { id: createFavoriteDto.catId },
      });
      expect(service.findByUserIdAndCatId).toHaveBeenCalledWith(
        userId,
        createFavoriteDto.catId
      );
      expect(favoriteRepository.create).toHaveBeenCalledWith({
        cat: { id: createFavoriteDto.catId },
        user: { id: userId },
      });
      expect(favoriteRepository.save).toHaveBeenCalledWith(newFavorite);
    });

    it("should throw BadRequestException if the cat with the provided ID does not exist", async () => {
      const createFavoriteDto: CreateFavoriteDto = { catId: 1 };
      const userId = 1;

      jest.spyOn(catRepository, "findOne").mockResolvedValueOnce(undefined);

      await expect(
        service.create(createFavoriteDto, userId)
      ).rejects.toThrowError(
        new BadRequestException("Cat with the provided ID does not exist.")
      );

      expect(catRepository.findOne).toHaveBeenCalledWith({
        where: { id: createFavoriteDto.catId },
      });
    });

    it("should throw BadRequestException if the favorite already exists for the user and cat", async () => {
      const createFavoriteDto: CreateFavoriteDto = { catId: 1 };
      const userId = 1;

      jest
        .spyOn(catRepository, "findOne")
        .mockResolvedValueOnce({ id: createFavoriteDto.catId } as Cat);
      jest
        .spyOn(service, "findByUserIdAndCatId")
        .mockResolvedValueOnce({} as Favorite);

      await expect(
        service.create(createFavoriteDto, userId)
      ).rejects.toThrowError(
        new BadRequestException("This cat is already a favorite.")
      );

      expect(catRepository.findOne).toHaveBeenCalledWith({
        where: { id: createFavoriteDto.catId },
      });
      expect(service.findByUserIdAndCatId).toHaveBeenCalledWith(
        userId,
        createFavoriteDto.catId
      );
    });
  });

  describe("remove", () => {
    it("should remove a favorite based on the provided favorite ID", async () => {
      const deleteFavoriteDto: DeleteFavoriteDto = { catId: 1 };
      const favoriteToRemove = { id: deleteFavoriteDto.catId } as Favorite;

      jest.spyOn(service, "findOne").mockResolvedValueOnce(favoriteToRemove);
      jest.spyOn(favoriteRepository, "remove").mockResolvedValueOnce(undefined);

      const result = await service.remove(deleteFavoriteDto);

      expect(result).toEqual({ message: "deleted successfully" });
      expect(service.findOne).toHaveBeenCalledWith(
        deleteFavoriteDto.catId,
        "delete"
      );
      expect(favoriteRepository.remove).toHaveBeenCalledWith(favoriteToRemove);
    });

    it("should throw HttpException if the favorite with the provided ID is not found", async () => {
      const deleteFavoriteDto: DeleteFavoriteDto = { catId: 1 };

      jest
        .spyOn(service, "findOne")
        .mockRejectedValueOnce(
          new HttpException("Favorite not found", HttpStatus.NOT_FOUND)
        );

      await expect(service.remove(deleteFavoriteDto)).rejects.toThrowError(
        new HttpException("Favorite not found", HttpStatus.NOT_FOUND)
      );
      expect(service.findOne).toHaveBeenCalledWith(
        deleteFavoriteDto.catId,
        "delete"
      );
    });
  });

  describe("findByUserIdWithFavoriteCats", () => {
    it("should fetch favorite cats for the specified user", async () => {
      const userId = 1;
      const favorites = [
        { id: 1, cat: { id: 1 } },
        { id: 2, cat: { id: 2 } },
      ] as Favorite[];

      jest.spyOn(favoriteRepository, "find").mockResolvedValueOnce(favorites);

      const result = await service.findByUserIdWithFavoriteCats(userId);

      expect(result).toEqual({ favorites });
      expect(favoriteRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ["cat"],
      });
    });
  });
});
