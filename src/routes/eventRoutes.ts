import express from "express";
import { Util } from "../utilities/index";
import { createNewEvents, getEventsWithMeetId } from "../controllers/events";

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewEvents)
);

router.get("/:meetId",
  Util.handleErrors(getEventsWithMeetId)
);
