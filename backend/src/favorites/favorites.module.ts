import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entities/favorite.entity";
import { UsersModule } from "@/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "@/common/guards/auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    UsersModule,
    JwtModule.register({}),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, AuthGuard],
})
export class FavoritesModule {}
