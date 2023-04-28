import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "note",
})
export class NoteEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  detail: string;

  @Column()
  description: string;

  @Column()
  arquived: boolean;

  @Column({
    name: "id_user",
  })
  idUser: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;
}
