import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { JwtAuthGuard } from "@/common/guards/jwt.guard";
import { Role } from "@/common/entities/role.entity";
import { AuthGuard } from "@/common/guards/auth.guard";

@UseGuards(JwtAuthGuard, RolesGuard, AuthGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Roles([Role.Admin])
  @Post()
  create(@Body() createCatDto: CreateCatDto, @Request() req) {
    return this.catsService.create(createCatDto, req?.user?.id);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catsService.findOne(+id, "get");
  }

  @Roles([Role.Admin])
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateCatDto: UpdateCatDto,
    @Request() req
  ) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Roles([Role.Admin])
  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    return this.catsService.remove(+id, req?.user?.id);
  }
}
