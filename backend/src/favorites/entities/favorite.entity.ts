import { Cat } from "@/cats/entities/cat.entity";
import { User } from "@/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Cat, (cat) => cat.favorites)
  cat: Cat;
}
