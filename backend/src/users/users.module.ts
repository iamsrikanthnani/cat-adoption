import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import TypeORM module for user entity.
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export user service for dependency injection.
})
export class UsersModule {}
