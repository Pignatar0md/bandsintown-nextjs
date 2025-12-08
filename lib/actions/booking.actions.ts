'use server';
import { BookingModel } from "@/database";
import dbConnect from "../mongodb";

type BookingProps = {
    eventId: string;
    slug: string;
    email: string;
}

export const createBooking = async ({ eventId, slug, email }: BookingProps) => {
    try {
        await dbConnect();
        await BookingModel.create({ eventId, slug, email });
        return { success: true, error: null };
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
}