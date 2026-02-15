import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { User, UserWithoutPassword } from "../models/user"

export const Util = {
  handleErrors: (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next))
        .catch((error) => res.status(500).json(error))
    }
  },

  checkJWTToken: (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.jwt) {
      jwt.verify(
        req.cookies.jwt,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: VerifyErrors | null, accountData: unknown) => {
          if (err) {
            res.status(400).json({message: "Please login"})
            res.clearCookie("jwt")
            return res.redirect("#login")
          }
          res.locals.accountData = accountData
          res.locals.loggedin = 1
          next()
        }
      )
    } else {
      next()
    }
  }
}
