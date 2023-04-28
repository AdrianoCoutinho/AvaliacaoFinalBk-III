import { Note } from "../../models/note.model";
import { DatabaseConnection } from "../config/database.connection";
import { NoteEntity } from "../entities/note.entity";

export class NoteDatabase {
  private repository = DatabaseConnection.connection.getRepository(NoteEntity);

  public async create(id: string, note: Note) {
    const noteEntity = this.repository.create({
      id: note.id,
      detail: note.detail,
      description: note.description,
      arquived: note.arquived,
      idUser: id,
    });

    const result = await this.repository.save(noteEntity);

    return NoteDatabase.mapEntityToModel(result);
  }

  public async get(id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const result = await repository.findOneBy({ id });

    if (result === null) {
      return null;
    }

    return NoteDatabase.mapEntityToModel(result);
  }

  public async delete(id: string) {
    const noteEntity = this.repository.delete({ id });
  }

  public static mapEntityToModel(entity: NoteEntity): Note {
    return Note.create(entity.id, entity.detail, entity.description);
  }
}
