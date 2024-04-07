import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entities/favorite.entity";
import { UsersModule } from "@/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "@/common/guards/auth.guard";
import { CatsModule } from "@/cats/cats.module";
import { CatsService } from "@/cats/cats.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    UsersModule,
    CatsModule,
    JwtModule.register({}),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, AuthGuard, CatsService],
})
export class FavoritesModule {}
