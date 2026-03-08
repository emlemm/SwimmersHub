import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateEvent = {
  createEventRules:() => {
    return[
      body("meetId")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 24, max: 24})
        .withMessage("Must provide a valid meet Id."),

      body("raceId")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 24, max: 24})
        .withMessage("Must provide a valid race Id."),
        
      body("swimmerNames")
        .notEmpty()
        .withMessage("Must include at least 1 swimmer name.")
    ]
  },

  /* Check event data and return errors or continue to complete adding events */
  checkEventData: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
    } else {
      next();
    }
  }
}