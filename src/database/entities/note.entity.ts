import UserEntity from "../entities/user.entity";

import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
@Entity({
  name: "note",
})
export default class NoteEntity extends BaseEntity {
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

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;
}
