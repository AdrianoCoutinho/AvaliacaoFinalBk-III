import { Request, Response } from "express";
import { Note } from "../models/note.model";
import { RequestError } from "../statusResponses/Error";
import { RequestSuccess } from "../statusResponses/Success";
import { UserDatabase } from "../database/repositories/user.database";
import { NoteDatabase } from "../database/repositories/note.database";

export class NotesController {
  public async addNote(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { detail, description } = req.body;

      const usersData = new UserDatabase();

      const user = await usersData.get(id);

      if (!user) {
        return RequestError.notFound(res, "usuário");
      }

      const newNote = new Note(detail, description, false);

      const notesData = new NoteDatabase();

      const result = await notesData.create(id, newNote);

      return RequestSuccess.created(res, "recado", result.toJson());
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public async editNote(req: Request, res: Response) {
    try {
      const { noteid } = req.params;

      const { detail, description, arquived } = req.body;

      const notesData = new NoteDatabase();

      const noteExists = await notesData.get(noteid);

      if (!noteExists) {
        return RequestError.notFound(res, "recado");
      }

      const updatedNote = {
        detail,
        description,
        arquived,
      };

      const note = await notesData.updateWithSave(noteid, updatedNote);
      return RequestSuccess.ok(res, "o recado foi editado com sucesso", note);
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public async getNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { detail, arquived } = req.query;

      const usersData = new UserDatabase();

      const user = await usersData.get(id);

      if (!user) {
        return RequestError.notFound(res, "usuário");
      }

      let filtredNote = user.notes;

      if (detail != undefined && arquived?.toString() === "false") {
        filtredNote = user.notes.filter(
          (note) =>
            note.detail.includes(detail.toString()) && note.arquived === false
        );
      }

      if (detail != undefined && arquived?.toString() === "true") {
        filtredNote = user.notes.filter((note) =>
          note.detail.includes(detail.toString())
        );
      }

      if (detail === undefined && arquived === undefined) {
        filtredNote = user.notes.filter((note) => note.arquived === true);
      }

      return res.status(200).send({
        ok: true,
        message: "recados listados com sucesso",
        notes: filtredNote.map((note: any) => ({
          id: note.id,
          description: note.description,
          detail: note.detail,
          arquived: note.arquived,
        })),
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public async deleteNote(req: Request, res: Response) {
    try {
      const { noteid } = req.params;

      const NoteData = new NoteDatabase();

      const note = await NoteData.get(noteid);

      if (!note) {
        return RequestError.notFound(res, "recado");
      }

      await NoteData.delete(noteid);

      return res.status(200).send({
        ok: true,
        message: "recado deletado com sucesso",
        note: {
          note: note.id,
          detail: note.detail,
          description: note.description,
          arquived: note.arquived,
        },
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }
}
