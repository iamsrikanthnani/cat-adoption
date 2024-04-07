import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Gender } from "../dto/gender.enum";
import { User } from "@/users/entities/user.entity";
import { Favorite } from "@/favorites/entities/favorite.entity";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column("text", { array: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.cats)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.cat)
  favorites: Favorite[];
}
