import express from "express";
import { createNewRaceResults, getResultsFromMeetId, getResultsFromSwimmerName } from "../controllers/raceResults";
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewRaceResults)
);

router.get("/:meetId", 
  Util.handleErrors(getResultsFromMeetId)
);

router.get("/name/:swimmerName",
  Util.handleErrors(getResultsFromSwimmerName)
);