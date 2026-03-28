import express from "express";
import { Util } from "../utilities/index";
import { createNewHeating, getHeatingWithMeetId } from "../controllers/heatings";

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewHeating)
);

router.get("/:meetId",
  Util.handleErrors(getHeatingWithMeetId)
);
