import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  // Create a new cat
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const newCat = this.catsRepository.create(createCatDto);
    return this.catsRepository.save(newCat);
  }

  // Find all cats
  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  // Find a cat by ID
  async findOne(id: number, action: "update" | "delete" | "get"): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });
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
  async remove(id: number): Promise<{ message: string }> {
    const catToRemove = await this.findOne(id, "delete");
    await this.catsRepository.remove(catToRemove);
    return { message: `Cat deleted successfully` };
  }
}
