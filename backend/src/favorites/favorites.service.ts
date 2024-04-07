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

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>
  ) {}

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
    return this.favoritesRepository.findOne({ where: { userId, catId } });
  }

  // Create a new favorite
  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    // Check if the catId is already a favorite for the user
    const existingFavorite = await this.findByUserIdAndCatId(
      createFavoriteDto.userId,
      createFavoriteDto.catId
    );

    if (existingFavorite) {
      // If the favorite already exists, throw a BadRequestException
      throw new BadRequestException("This cat is already a favorite.");
    }

    // If the favorite does not exist, create it
    const favorite = this.favoritesRepository.create(createFavoriteDto);
    return this.favoritesRepository.save(favorite);
  }

  // Remove a favorite
  async remove(
    deleteFavoriteDto: DeleteFavoriteDto
  ): Promise<{ message: string }> {
    const favoriteToRemove = await this.findOne(deleteFavoriteDto.id, "delete");
    await this.favoritesRepository.remove(favoriteToRemove);
    return { message: `deleted successfully` };
  }

  // Find favorites by user ID
  async findByUserIdWithFavoriteCats(
    userId: number
  ): Promise<{ favorites: Favorite[] }> {
    const favorites = await this.favoritesRepository.find({
      where: { userId },
    });

    return { favorites };
  }
}
