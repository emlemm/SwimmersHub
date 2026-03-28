import express from "express";
import { Util } from "../utilities/index";
import { createNewRacing, getRacingWithMeetId } from "../controllers/racings";

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewRacing)
);

router.get("/:meetId",
  Util.handleErrors(getRacingWithMeetId)
);