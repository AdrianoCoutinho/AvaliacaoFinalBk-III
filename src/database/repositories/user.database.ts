import { DatabaseConnection } from "../config/database.connection";
import { User } from "../../models/user.model";
import { UserEntity } from "../entities/user.entity";

export class UserDatabase {
  public async listEntity(): Promise<User[]> {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.find();
    return result.map((user: any) => this.mapEntityToModel(user));
  }

  private mapEntityToModel(entity: UserEntity): User {
    return User.create(entity.id, entity.name, entity.email, entity.password);
  }
}
