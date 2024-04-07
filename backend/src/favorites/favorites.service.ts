import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateFavoriteDto, DeleteFavoriteDto } from "./dto";
import { Favorite } from "./entities/favorite.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Cat } from "@/cats/entities/cat.entity";

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  // Check if the cat with the provided ID exists
  async catExists(catId: number): Promise<boolean> {
    const cat = await this.catsRepository.findOne({ where: { id: catId } });
    return !!cat;
  }

  // Find a Favorite by ID
  async findOne(
    id: number,
    action: "update" | "delete" | "get"
  ): Promise<Favorite> {
    const favorite = await this.favoritesRepository.findOne({ where: { id } });
    // If favorite is not found, throw a 404
    if (!favorite) {
      throw new HttpException(
        `Favorite with ID ${id} not found.`,
        HttpStatus.NOT_FOUND
      );
    }

    return favorite;
  }

  // Find a favorite by user ID and cat ID
  async findByUserIdAndCatId(
    userId: number,
    catId: number
  ): Promise<Favorite | undefined> {
    return this.favoritesRepository.findOne({
      where: { user: { id: userId }, cat: { id: catId } },
    });
  }

  // Create a new favorite
  async create(
    createFavoriteDto: CreateFavoriteDto,
    userId: number
  ): Promise<Favorite> {
    // Check if the catId exists
    const catExists = await this.catExists(createFavoriteDto.catId);
    if (!catExists) {
      throw new BadRequestException("Cat with the provided ID does not exist.");
    }

    // Check if the catId is already a favorite for the user
    const existingFavorite = await this.findByUserIdAndCatId(
      userId,
      createFavoriteDto?.catId
    );

    if (existingFavorite) {
      // If the favorite already exists, throw a BadRequestException
      throw new BadRequestException("This cat is already a favorite.");
    }

    // If the favorite does not exist, create it and associate it with the user
    const newFavorite = this.favoritesRepository.create({
      cat: { id: createFavoriteDto.catId },
      user: { id: userId },
    });
    return this.favoritesRepository.save(newFavorite);
  }

  // Remove a favorite
  async remove(
    deleteFavoriteDto: DeleteFavoriteDto
  ): Promise<{ message: string }> {
    const favoriteToRemove = await this.findOne(
      deleteFavoriteDto.catId,
      "delete"
    );
    await this.favoritesRepository.remove(favoriteToRemove);
    return { message: `deleted successfully` };
  }

  // Find favorites by user ID
  async findByUserIdWithFavoriteCats(
    userId: number
  ): Promise<{ favorites: Favorite[] }> {
    const favorites = await this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ["cat"],
    });

    return { favorites };
  }
}
