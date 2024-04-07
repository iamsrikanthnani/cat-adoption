import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CatsModule } from "./cats/cats.module";
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    // global configuration module
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // database module
    DatabaseModule,
    // authentication module
    AuthModule,
    // users module
    UsersModule,
    // cats module
    CatsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
