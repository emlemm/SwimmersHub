import express from "express";
import { createNewMeet, getAllMeets, editMeet, getMeetById } from "../controllers/meets";
import { validateMeet as meetVal } from "../utilities/meetValidation";
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/",
  meetVal.createMeetRules(),
  meetVal.checkMeetData,
  Util.handleErrors(createNewMeet)
);

router.post("/edit",
  meetVal.createMeetRules(),
  meetVal.checkMeetData,
  Util.handleErrors(editMeet)
);
router.get("/",
  Util.handleErrors(getAllMeets)
);

router.get("/:id",
  Util.handleErrors(getMeetById)
);