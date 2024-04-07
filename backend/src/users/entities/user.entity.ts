import { Cat } from "@/cats/entities/cat.entity";
import { Favorite } from "@/favorites/entities/favorite.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

export enum Role {
  User = "user",
  Admin = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: Role, default: Role.User })
  role: Role;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => Cat, (cat) => cat.user)
  cats?: Cat[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites?: Favorite[];
}
