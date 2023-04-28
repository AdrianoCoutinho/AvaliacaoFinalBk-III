import { Router } from "express";
import { NotesController } from "../controllers/notes.controller";
import { UsersController } from "../controllers/users.controller";
import { UserValidateMiddleware } from "../middlewares/user-validate.middleware";

export const userRoutes = () => {
  const app = Router();

  app.get("/", new UsersController().list);

  app.get("/:id", new UsersController().get);

  app.post("/", new UsersController().create);

  app.post("/:id/notes", new NotesController().addNote);

  app.delete("/notes/:noteid", new NotesController().deleteNote);

  // app.get("/:id/notes", new NotesController().getNotes);

  // app.post(
  //   "/login",
  //   UserValidateMiddleware.ValidateLogin,
  //   new UsersController().login
  // );

  // app.put("/:id/notes/:noteid", new NotesController().editNote);

  return app;
};
