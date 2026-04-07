import { Heating } from "../models/heating";
import { Request, Response } from "express";

export const createNewHeating = async (req: Request, res: Response) => {
  const meetId = req.body.meetId;
  const newHeating = await Heating.updateOne({meetId: meetId},{...req.body},{upsert: true})
  res.status(201).json({newHeating});
}

export const getHeatingWithMeetId = async (req: Request, res: Response) => {
  const meetId = req.params.meetId;
  const heatingFromMeet = await Heating.findOne({meetId: meetId});
  res.status(200).json(heatingFromMeet);
};