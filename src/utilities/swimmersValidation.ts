import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

/* newSwimmer Data Validation Rules */
export const validateSwimmer = {
  createSwimmerRules:() => {
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

      body("birthday")
      .trim()
      .escape()
      .notEmpty()
      .isDate()
      .withMessage("A valid date is required."),
      
      body("team")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide the name of the team that your swimmer belongs to."), 
    ]
  },

  /* Check swimmer data and return errors or continue to registration */
  checkSwimmerData: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
    } else {
      next();
    }
  }

};