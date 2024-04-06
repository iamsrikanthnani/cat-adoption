import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { JwtAuthGuard } from "@/common/guards/jwt.guard";
import { Role } from "@/common/entities/role.entity";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Roles([Role.Admin])
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catsService.findOne(+id);
  }

  @Roles([Role.Admin])
  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatDto: CreateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Roles([Role.Admin])
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.catsService.remove(+id);
  }
}
