import { NextFunction, Request, Response } from "express";
import { UsersController } from "../controllers/users.controller";
import { RequestError } from "../statusResponses/Error";

export class UserValidateMiddleware {
  // public static ValidateRegister(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const { name, email, password, repassword } = req.body;
  //     const emailExists = new UsersController().getByEmail(email);
  //     if (!name) {
  //       return RequestError.fieldNotProvided(res, "nome");
  //     }
  //     if (!email) {
  //       return RequestError.fieldNotProvided(res, "email");
  //     }
  //     if (!password) {
  //       return RequestError.fieldNotProvided(res, "senha");
  //     }
  //     if (!repassword) {
  //       return RequestError.fieldNotProvided(res, "repetir senha");
  //     }
  //     if (repassword != password) {
  //       return RequestError.genericError(res, "senhas não coincidem");
  //     }
  //     if (emailExists) {
  //       return RequestError.genericError(
  //         res,
  //         "Já existe um usuário com este email"
  //       );
  //     }
  //     next();
  //   } catch (error: any) {
  //     return RequestError.ServerError(res, error);
  //   }
  // }
  // public static ValidateLogin(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { email, password } = req.body;
  //     const usersData = [...Users];
  //     const emailExists = usersData.find((user) => user.email === email);
  //     if (!emailExists) {
  //       return res.status(400).send({
  //         ok: false,
  //         message: "Email ou senha incorretos",
  //       });
  //     }
  //     if (emailExists.password !== password) {
  //       return res.status(400).send({
  //         ok: false,
  //         message: "Email ou senha incorretos",
  //       });
  //     }
  //     next();
  //   } catch (error: any) {
  //     return RequestError.ServerError(res, error);
  //   }
  // }
}
