import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Gender } from "../dto/gender.enum";

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

  @Column("jsonb")
  user: Record<string, any>;
}
