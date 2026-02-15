import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

/* createAccount Data Validation Rules */
export const validateAccount = {
  createAccountRules:() => {
    return [
      body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), 

      body("lastName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), 

      body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required.")
    ]
  },

  /* Password Validation Rules for createAccount  */
  passwordRules: () => {
    return [
      body("password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
  },

  /* Check registration data and return errors or continue to registration */
  checkAccountData: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
    } else {
      next();
    }
  }

};

/* login validation rules */
export const validateLogin = {
  loginRules: () => {
    return [
      body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

      // password is required and must be strong password
      body("password")
      .trim()
      .notEmpty()
      .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
    ]
  },

  /* Check login data and return errors or continue to completing login */
  checkLoginData: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
    } else {
      next();
    }
  }

}