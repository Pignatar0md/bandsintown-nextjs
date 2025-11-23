import { Types, Schema, model, models, Document } from "mongoose";
import { EventModel } from "./event.model";

export interface Booking extends Document {
	eventId: Types.ObjectId;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

const BookingSchema = new Schema<Booking>(
	{
		eventId: {
			type: Schema.Types.ObjectId,
			ref: "Event",
			required: [true, "Event id is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			validate: {
				validator: (email: string) => {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					return emailRegex.test(email);
				},
				message: "Please [provide a valid email address]",
			},
		},
	},
	{ timestamps: true }
);

BookingSchema.pre("save", async function (next) {
	const booking = this as Booking;
	if (booking.isModified("eventId") || booking.isNew) {
		try {
			const eventExists = await EventModel.findById(booking.eventId).select(
				"_id"
			);
			if (!eventExists) {
				const error = new Error("Event not found");
				error.name = "ValidationError";
				return next(error);
			}
		} catch {
			const validationError = new Error("Invalid event id format or db error");
			validationError.name = "ValidationError";
			return next(validationError);
		}
		booking.email = booking.email.toLowerCase();
	}
	next();
});

BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });

const BookingModel = models.Booking || model<Booking>("Booking", BookingSchema);

export default BookingModel;
