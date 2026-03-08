import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateMeet = {
  createMeetRules:() => {
    return [
      body("meetDate")
        .trim()
        .escape()
        .notEmpty()
        .isDate()
        .withMessage("A valid date is required."),
      
      body("hostTeam")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide the name of the hosting swim team."), 

      body("address")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide the address of the hosting swim team."), 


      body("travellingTeam")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide the name of the travelling swim team."), 
    ]
  },

  /* Check swimmer data and return errors or continue to registration */
  checkMeetData: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
    } else {
      next();
    }
  }
}