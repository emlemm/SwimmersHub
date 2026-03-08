import { Swimmer } from "../models/swimmer";
import { User } from "../models/user";
import { Request, Response } from "express";

function validateSwimmerBody(body: any) {
  if (!body || Object.keys(body).length === 0) return "Request body cannot be empty.";
  if (!body.firstName) return "First name is required.";
  if (!body.lastName) return "Last name is required.";
  if (!body.birthday) return "Birthday is required.";
  if (!body.team) return "Swimmer's team name is required.";
  return null;
}

export const createNewSwimmer = async (req: Request, res: Response) => {
  const validationError = validateSwimmerBody(req.body);
  if (validationError) return res.status(400).json({ message: validationError });

  const userId = res.locals.accountData._id
  const swimmer = await Swimmer.create({...req.body, userId: userId});
  res.status(201).json(swimmer);

};

export const getUserSwimmers = async (req: Request, res: Response) => {
  const userId = res.locals.accountData._id
  const swimmers = await Swimmer.find({userId: userId});
  res.status(200).json(swimmers);
}
