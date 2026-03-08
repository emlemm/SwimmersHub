import express from "express";
import { Util } from "../utilities/index";
//import { validateEvent as eventVal } from "../utilities/eventValidation";
import { createNewEvents } from "../controllers/events";

export const router = express.Router();

router.post("/",
  Util.handleErrors(createNewEvents)
);