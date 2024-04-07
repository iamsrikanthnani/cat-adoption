import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto, DeleteFavoriteDto } from "./dto";
import { JwtAuthGuard } from "@/common/guards/jwt.guard";
import { AuthGuard } from "@/common/guards/auth.guard";
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // Endpoint for adding a favorite cat.
  @Post("/add")
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req) {
    // Set user ID from request to the DTO.
    createFavoriteDto.userId = req?.user?.id;
    return this.favoritesService.create(createFavoriteDto);
  }

  // Endpoint for removing a favorite cat.
  @Delete("/remove")
  remove(@Body() deleteFavoriteDto: DeleteFavoriteDto) {
    return this.favoritesService.remove(deleteFavoriteDto);
  }

  // Endpoint for fetching favorite cats by user ID.
  @Get()
  findByUserIdWithFavoriteCats(@Request() req) {
    return this.favoritesService.findByUserIdWithFavoriteCats(req?.user?.id);
  }
}
