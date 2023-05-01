import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity({
  name: "user",
})
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 30,
  })
  name: string;

  @Column({
    length: 64,
    unique: true,
  })
  email: string;

  @Column({
    length: 32,
  })
  password: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => NoteEntity, (note) => note.user, {
    eager: true,
  })
  notes: NoteEntity[];
}
