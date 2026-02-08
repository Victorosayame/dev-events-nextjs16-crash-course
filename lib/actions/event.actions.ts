//step18,create server actions to handle booking event
"use server";

import connectDB from "../mongodb";
import { Event, IEvent } from "@/database";

//action to fetchallevents
export const fetchAllEvents = async () => {
  await connectDB();
  return Event.find().sort({ createdAt: -1}).lean();
}

export const getSimilarEventsBySlug = async (slug: string): Promise<IEvent[]> => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    return await Event.find({ _id: { $ne: event._id}, tags: { $in: event.tags } }).lean<IEvent[]>();
    //use. lean to return a plain javascript object instead of a mongoose document, this is because we want to return the data directly to the client without any mongoose methods or properties, we just want the plain data
  } catch (error) {
    return [];
  }
}