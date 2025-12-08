'use server';
//server actions
import { EventModel } from "@/database";
import dbConnect from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await dbConnect();
        const event = await EventModel.findOne({ slug });
        console.log("event", event);
        
        if (!event) {
            console.error("Event not found for slug:", slug);
            return [];
        }
        
        const similarEvents = await EventModel.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags },
        }).lean();
        return similarEvents;
    } catch (error) {
        console.error(error);
        return [];
    }
}