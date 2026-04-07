import { Racing } from "../models/racing";
import { Request, Response } from "express";

export const createNewRacing = async (req: Request, res: Response) => {
  const meetId = req.body.meetId;
  const newRacing = await Racing.updateOne({meetId: meetId},{...req.body},{upsert: true})
  res.status(201).json({newRacing});
}

export const getRacingWithMeetId = async (req: Request, res: Response) => {
  const meetId = req.params.meetId;
  const racingFromMeet = await Racing.findOne({meetId: meetId});
  res.status(200).json(racingFromMeet);
};