import { Test, TestingModule } from "@nestjs/testing";
import { FavoritesService } from "./favorites.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateFavoriteDto, DeleteFavoriteDto } from "./dto";
import { Favorite } from "./entities/favorite.entity";
import { BadRequestException, HttpException } from "@nestjs/common";

// Mock Repository
const mockRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe("FavoritesService", () => {
  let service: FavoritesService;
  let repository: Repository<Favorite>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    repository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("should find a favorite by ID", async () => {
      const favorite: Favorite = {
        id: 1,
        userId: 1,
        catId: 1,
      };

      mockRepository.findOne.mockResolvedValueOnce(favorite);

      const result = await service.findOne(1, "get");

      expect(result).toEqual(favorite);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should throw an HttpException if favorite is not found", async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(service.findOne(1, "get")).rejects.toThrowError(
        HttpException
      );
    });
  });

  describe("findByUserIdAndCatId", () => {
    it("should find a favorite by user ID and cat ID", async () => {
      const favorite: Favorite = {
        id: 1,
        userId: 1,
        catId: 1,
      };

      mockRepository.findOne.mockResolvedValueOnce(favorite);

      const result = await service.findByUserIdAndCatId(1, 1);

      expect(result).toEqual(favorite);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1, catId: 1 },
      });
    });

    it("should return undefined if favorite is not found", async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);

      const result = await service.findByUserIdAndCatId(1, 1);

      expect(result).toBeUndefined();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1, catId: 1 },
      });
    });
  });

  describe("create", () => {
    it("should create a new favorite", async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        catId: 1,
        userId: 1,
      };
      const favorite: Favorite = {
        id: 1,
        userId: 1,
        catId: 1,
      };

      mockRepository.findOne.mockResolvedValueOnce(undefined);
      mockRepository.create.mockReturnValueOnce(favorite);
      mockRepository.save.mockResolvedValueOnce(favorite);

      const result = await service.create(createFavoriteDto);

      expect(result).toEqual(favorite);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1, catId: 1 },
      });
      expect(mockRepository.create).toHaveBeenCalledWith(createFavoriteDto);
      expect(mockRepository.save).toHaveBeenCalledWith(favorite);
    });

    it("should throw a BadRequestException if favorite already exists", async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        catId: 1,
        userId: 1,
      };

      mockRepository.findOne.mockResolvedValueOnce({});

      await expect(service.create(createFavoriteDto)).rejects.toThrowError(
        BadRequestException
      );
    });
  });

  describe("remove", () => {
    it("should remove a favorite", async () => {
      const deleteFavoriteDto: DeleteFavoriteDto = {
        id: 1,
      };

      const favorite: Favorite = {
        id: 1,
        userId: 1,
        catId: 1,
      };

      mockRepository.findOne.mockResolvedValueOnce(favorite);
      mockRepository.remove.mockResolvedValueOnce(undefined);

      const result = await service.remove(deleteFavoriteDto);

      expect(result).toEqual({ message: "deleted successfully" });
      expect(mockRepository.remove).toHaveBeenCalledWith(favorite);
    });

    it("should throw an HttpException if favorite is not found", async () => {
      const deleteFavoriteDto: DeleteFavoriteDto = {
        id: 1,
      };

      mockRepository.findOne.mockResolvedValueOnce(undefined);

      await expect(service.remove(deleteFavoriteDto)).rejects.toThrowError(
        HttpException
      );
    });
  });

  describe("findByUserIdWithFavoriteCats", () => {
    it("should fetch favorite cats by user ID", async () => {
      const userId = 1;
      const mockFavoriteCats: Favorite[] = [
        {
          id: 1,
          catId: 1,
          userId: 1,
        },
        {
          id: 2,
          catId: 2,
          userId: 1,
        },
      ];

      mockRepository.find.mockResolvedValueOnce(mockFavoriteCats);

      const result = await service.findByUserIdWithFavoriteCats(userId);

      expect(result).toEqual({ favorites: mockFavoriteCats });
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });
});
