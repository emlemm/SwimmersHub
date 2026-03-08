import { Event } from "../models/event";
import { Request, Response } from "express";

export const createNewEvents = async (req: Request, res: Response) => {
  const meetId = req.body.meetId;
  const eventsMap = req.body.data;
  const session = await Event.startSession();
  await session.withTransaction(async () => {
    await Event.deleteMany({meetId: meetId});
    for (let i=0; i<eventsMap.length; i++) {
      await Event.create({...eventsMap[i], eventNumber: i+1, meetId: meetId})
    }
  });
  await session.endSession();
  res.status(201).json({message: "Successful entry"});
}