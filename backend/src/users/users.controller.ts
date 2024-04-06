import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to find a user by email
  @Get(":id")
  async findOne(@Param("email") email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
