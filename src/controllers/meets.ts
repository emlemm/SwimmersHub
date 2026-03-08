import { Meet } from "../models/meet";
import { Request, Response } from "express";

export const createNewMeet = async (req: Request, res: Response) => {
  const meet = await Meet.create({...req.body});
  res.status(201).json(meet);
};

export const getAllMeets = async (req: Request, res: Response) => {
  const allMeets = await Meet.find({});
  res.status(200).json(allMeets);
};

export const editMeet = async (req: Request, res: Response) => {
  const meetUpdated = await Meet.findByIdAndUpdate(req.body.meetId, {...req.body});
  res.status(200).json(meetUpdated);
};