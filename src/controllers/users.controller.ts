import { Request, Response } from "express";
import { Users } from "../database/users";
import { User } from "../models/user.model";
import { RequestError } from "../statusResponses/Error";
import { RequestSuccess } from "../statusResponses/Success";

export class UsersController {
  public list(req: Request, res: Response) {
    try {
      const usersData = [...Users];
      return res.status(200).send({
        ok: "true",
        message: "users listed",
        data: usersData,
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = new User(name, email, password);
      Users.push(user);

      return RequestSuccess.created(res, "usuário", user.toJson());
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const usersData = [...Users];
      const user = usersData.find((user) => user.email === email);

      return RequestSuccess.ok(res, "Logado com sucesso", {
        id: user?.id,
        name: user?.name,
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public getByEmail(email: string) {
    const usersData = [...Users];
    const emailExists = usersData.find((user) => user.email === email);
    return emailExists;
  }

  public get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usersData = [...Users];
      const user = usersData.find((user) => user.id === id);
      if (user) {
        return res.status(200).send({
          ok: true,
          message: "usuario encontrado",
        });
      }
      return res.status(404).send({
        ok: false,
        message: "usuario não encontrado",
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }
}
