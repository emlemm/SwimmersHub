import express from "express";
import { createNewMeet, getAllMeets, editMeet } from "../controllers/meets";
import { validateMeet as meetVal } from "../utilities/meetValidation";
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/",
  meetVal.createMeetRules(),
  meetVal.checkMeetData,
  Util.handleErrors(createNewMeet)
);

router.post("/",
  meetVal.createMeetRules(),
  meetVal.checkMeetData,
  Util.handleErrors(editMeet)
);
router.get("/",
  Util.handleErrors(getAllMeets)
);