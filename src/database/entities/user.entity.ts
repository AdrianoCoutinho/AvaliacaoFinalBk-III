import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "user",
})
export class UserEntity {
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
}
