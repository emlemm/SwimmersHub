import express from "express";
import { createNewRaceResults, getResultsFromMeetId } from "../controllers/raceResults";
//import { validateRaceResults as raceResultsVal } from "../utilities/raceResultsValidation";
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewRaceResults)
);

router.get("/:meetId", 
  Util.handleErrors(getResultsFromMeetId)
);