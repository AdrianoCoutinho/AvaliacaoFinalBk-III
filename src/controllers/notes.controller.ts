import { Request, Response } from "express";
import { Users } from "../database/users";
import { Note } from "../models/note.model";
import { RequestError } from "../statusResponses/Error";
import { RequestSuccess } from "../statusResponses/Success";

export class NotesController {
  public addNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { detail, description } = req.body;
      const userExists = Users.findIndex((user) => user.id === id);
      if (userExists < 0) {
        return RequestError.notFound(res, "usuário");
      }
      const newNote = new Note(detail, description);

      Users[userExists].notes = [...Users[userExists].notes, newNote];
      return RequestSuccess.created(res, "recado", newNote.toJson());
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public getNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { detail, arquived } = req.query;
      const userExists = Users.find((user) => user.id === id);
      if (!userExists) {
        return RequestError.notFound(res, "usuário");
      }

      let filtredNote = userExists.notes;
      if (detail != undefined && arquived?.toString() === "false") {
        filtredNote = userExists.notes.filter(
          (note) =>
            note.detail.includes(detail.toString()) && note.arquived === false
        );
      }

      if (detail != undefined && arquived?.toString() === "true") {
        filtredNote = userExists.notes.filter((note) =>
          note.detail.includes(detail.toString())
        );
      }

      if (detail === undefined && arquived === undefined) {
        filtredNote = userExists.notes.filter((note) => note.arquived === true);
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

  public editNote(req: Request, res: Response) {
    try {
      const { id, noteid } = req.params;
      const { detail, description, arquived } = req.body;

      const userExists = Users.findIndex((user) => user.id === id);
      if (userExists < 0) {
        return RequestError.notFound(res, "usuário");
      }

      const noteExists = Users[userExists].notes.findIndex(
        (note) => note.id === noteid
      );
      if (noteExists < 0) {
        return RequestError.notFound(res, "recado");
      }

      if (arquived != undefined) {
        Users[userExists].notes[noteExists].arquived = arquived;
      }

      if (detail) {
        Users[userExists].notes[noteExists].detail = detail;
      }

      if (description) {
        Users[userExists].notes[noteExists].description = description;
      }

      const updatedNote = Users[userExists].notes[noteExists];

      return RequestSuccess.ok(
        res,
        "o recado foi editado com sucesso",
        updatedNote.toJson()
      );
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public deleteNote(req: Request, res: Response) {
    try {
      const { id, noteid } = req.params;
      const userExists = Users.findIndex((user) => user.id === id);
      if (userExists < 0) {
        return RequestError.notFound(res, "usuário");
      }
      const noteExists = Users[userExists].notes.findIndex(
        (note) => note.id === noteid
      );
      if (noteExists < 0) {
        return RequestError.notFound(res, "recado");
      }
      const deletedNote = Users[userExists].notes.splice(noteExists, 1);
      return res.status(200).send({
        ok: true,
        message: "recado deletado com sucesso",
        note: deletedNote[0].toJson(),
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }
}
