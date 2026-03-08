import { Race } from "../models/race";
import { Request, Response } from "express";

export const createNewRace = async (req: Request, res: Response) => {
  const meet = await Race.create({...req.body});
  res.status(201).json(meet);
};

export const getAllRaces = async (req: Request, res: Response) => {
  const allRaces = await Race.find({});
  res.status(200).json(allRaces)
};
