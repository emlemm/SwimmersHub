import express from "express";
import { createNewRace, getAllRaces } from "../controllers/races";
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewRace)
);

router.get("/",
  Util.handleErrors(getAllRaces)
);