import { DatabaseConnection } from "../config/database.connection";
import { User } from "../../models/user.model";
import { UserEntity } from "../entities/user.entity";
import { NoteDatabase } from "./note.database";

export class UserDatabase {
  private repository = DatabaseConnection.connection.getRepository(UserEntity);

  public async listEntity(): Promise<User[]> {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.find({
      relations: ["notes"],
    });

    return result.map((user: any) => this.mapEntityToModel(user));
  }

  public async get(id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.findOne({
      where: { id: id },
      relations: ["notes"],
    });

    if (result === null) {
      return null;
    }
    return this.mapEntityToModel(result);
  }

  public async create(user: User) {
    const userEntity = UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const result = await this.repository.save(userEntity);

    return this.mapEntityToModel(result);
  }

  private mapEntityToModel(entity: UserEntity): User {
    const notesEntity = entity.notes ?? [];

    const notes = notesEntity.map((item) =>
      NoteDatabase.mapEntityToModel(item)
    );

    return User.create(
      entity.id,
      entity.name,
      entity.email,
      entity.password,
      notes
    );
  }
}
