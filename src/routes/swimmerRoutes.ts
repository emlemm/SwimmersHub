import express from "express";
import { createNewSwimmer, getUserSwimmers } from "../controllers/swimmers";
import { validateSwimmer as swimmerVal } from "../utilities/swimmersValidation";
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/",
  swimmerVal.createSwimmerRules(),
  swimmerVal.checkSwimmerData,
  Util.handleErrors(createNewSwimmer)
);

router.get("/", 
  Util.handleErrors(getUserSwimmers)
);