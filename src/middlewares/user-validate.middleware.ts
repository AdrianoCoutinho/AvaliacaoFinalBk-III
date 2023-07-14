import { NextFunction, Request, Response } from "express";
import { UsersController } from "../controllers/users.controller";
import { RequestError } from "../statusResponses/Error";
import { UserDatabase } from "../database/repositories/user.database";

export class UserValidateMiddleware {
  public static async ValidateRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, email, password, repassword } = req.body;

      if (!name) {
        return RequestError.fieldNotProvided(res, "name");
      }
      if (!email) {
        return RequestError.fieldNotProvided(res, "email");
      }
      if (!password) {
        return RequestError.fieldNotProvided(res, "password");
      }

      if (password.length < 6) {
        return RequestError.genericError(
          res,
          "senha precisar ter mais que 6 caracteres"
        );
      }

      if (!repassword) {
        return RequestError.fieldNotProvided(res, "repassword senha");
      }
      if (repassword != password) {
        return RequestError.genericError(res, "senhas não coincidem");
      }

      const usersData = new UserDatabase();

      const emailExists = await usersData.getByEmail(email);

      if (emailExists) {
        return RequestError.genericError(
          res,
          "Já existe um usuário com este email"
        );
      }
      next();
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }
  public static async ValidateLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return RequestError.fieldNotProvided(res, "email");
      }

      if (!password) {
        return RequestError.fieldNotProvided(res, "password");
      }

      const usersData = new UserDatabase();

      const user = await usersData.getByEmail(email);

      if (!user) {
        return RequestError.genericError(res, "email ou senha incorretos");
      }

      if (password !== user.password) {
        return RequestError.genericError(res, "email ou senha incorretos");
      }
      next();
    } catch (error: any) {
      return RequestError.ServerError(res, error);
    }
  }
}
