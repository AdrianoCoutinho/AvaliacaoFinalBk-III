import { Request, Response } from "express";
import { User } from "../models/user.model";
import { RequestError } from "../statusResponses/Error";
import { RequestSuccess } from "../statusResponses/Success";
import { UserDatabase } from "../database/repositories/user.database";

export class UsersController {
  public async list(req: Request, res: Response) {
    try {
      const usersData = new UserDatabase();
      const users = await usersData.listEntity();

      const result = users.map((user) => user.toJson());

      return res.status(200).send({
        ok: true,
        message: "Lista de usuários obtida",
        data: result,
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usersData = new UserDatabase();

      const user = await usersData.get(id);

      if (!user) {
        return RequestError.notFound(res, "Usuário");
      }

      return res.status(200).send({
        ok: true,
        message: "Lista de usuários obtida",
        data: user.toJson(),
      });
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const usersData = new UserDatabase();

      const user = new User(name, email, password);

      const result = await usersData.create(user);

      return RequestSuccess.created(res, "usuário", result.toJson());
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }

  // public login(req: Request, res: Response) {
  //   try {
  //     const { email } = req.body;
  //     const usersData = [...Users];
  //     const user = usersData.find((user) => user.email === email);

  //     return RequestSuccess.ok(res, "Logado com sucesso", {
  //       id: user?.id,
  //       name: user?.name,
  //     });
  //   } catch (error: any) {
  //     return RequestError.ServerError(res, error);
  //   }
  // }

  // public getByEmail(email: string) {
  //   const usersData = [...Users];
  //   const emailExists = usersData.find((user) => user.email === email);
  //   return emailExists;
  // }
}
