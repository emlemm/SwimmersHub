import { RaceResults } from "../models/raceResults";
import { Event } from "../models/event";
import { Request, Response } from "express";

export const createNewRaceResults = async (req: Request, res: Response) => {
  const raceResultsMap = req.body;
  const session = await RaceResults.startSession();
  await session.withTransaction(async () => {
    for (let i=0; i<raceResultsMap.length; i++) {
      await RaceResults.deleteMany({eventId: raceResultsMap[i].eventId});
      for (let j=0; j<raceResultsMap[i].swimmerResults.length; j++) {
        if (raceResultsMap[i].swimmerResults[j].swimmerName) {
          await RaceResults.create({...raceResultsMap[i].swimmerResults[j], eventId: raceResultsMap[i].eventId})
        }
      }
    }
  });
  await session.endSession();
  res.status(201).json({message: "Successful entry"});
};

export const getResultsFromMeetId = async (req: Request, res: Response) => {
  const meetId = req.params.meetId;
  const eventsFromMeet = await Event.find({meetId: meetId}).populate("raceId");
  const results: Record<string, Object> = {};
  for (let i=0; i<eventsFromMeet.length; i++) {
    const eventId = eventsFromMeet[i]._id.toString();
    const raceResults = await RaceResults.find({eventId: eventId}).sort("disqualified time");
    if (raceResults.length) {
      results[eventId] = {event: eventsFromMeet[i], raceResults: raceResults};
    } else {
      results[eventId] = {event: eventsFromMeet[i], raceResults: eventsFromMeet[i].swimmerNames.map((name) => {
        return {eventId: eventId, swimmerName: name }
      })}
    }
  };
  res.status(200).json(results)
};

export const getResultsFromSwimmerName = async (req: Request, res: Response) => {
  const swimmerName = req.params.swimmerName;
  const raceResultsBySwimmer = await RaceResults.find({swimmerName: swimmerName}).populate({
    path: "eventId",
    populate: [{ path: "meetId"}, { path: "raceId" }]
  });
  res.status(200).json(raceResultsBySwimmer)
};
