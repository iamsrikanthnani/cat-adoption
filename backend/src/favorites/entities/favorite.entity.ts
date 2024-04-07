import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  catId: number;
}
