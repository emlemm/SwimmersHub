import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRaceResults = {
  createEventRules:() => {
    return[
      body("eventId")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 24, max: 24})
        .withMessage("Must provide a valid event Id."),
 
      body("swimmerName")
        .notEmpty()
        .withMessage("Must include at least 1 swimmer name.")
    ]
  },

  /* Check event data and return errors or continue to complete adding events */
  checkRaceResultsData: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json(errors);
    } else {
      next();
    }
  }
}