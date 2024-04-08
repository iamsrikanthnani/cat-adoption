import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cat } from "./entities/cat.entity";
import { CreateCatDto, UpdateCatDto } from "./dto";
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  async create(createCatDto: CreateCatDto, userId: number): Promise<Cat> {
    const newCat = this.catsRepository.create({
      ...createCatDto,
      user: { id: userId },
    });
    return this.catsRepository.save(newCat);
  }

  // Find all cats
  async findAll(): Promise<Cat[]> {
    const cats = await this.catsRepository.find({
      relations: ["favorites.user"],
    });

    return cats;
  }

  // Find a cat by ID
  async findOne(id: number, action: "update" | "delete" | "get"): Promise<Cat> {
    const cat = await this.catsRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!cat) {
      throw new HttpException(
        `Cannot ${action} cat. Cat with ID ${id} not found.`,
        HttpStatus.NOT_FOUND
      );
    }

    return cat;
  }

  // Update a cat
  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const catToUpdate = await this.findOne(id, "update");

    const updatedCat = { ...catToUpdate, ...updateCatDto };
    return this.catsRepository.save(updatedCat);
  }

  // Remove a cat
  async remove(id: number, userId: number): Promise<{ message: string }> {
    // Find the cat to remove
    const catToRemove = await this.findOne(id, "delete");

    // Check if the user is authorized to delete the cat
    if (catToRemove.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this cat"
      );
    }

    // Remove the cat
    await this.catsRepository.remove(catToRemove);
    return { message: `Cat deleted successfully` };
  }
}
