import { Schema, model, models, Document } from "mongoose";

export interface Event extends Document {
	title: string;
	slug: string;
	description: string;
	overview: string;
	image: string;
	venue: string;
	location: string;
	date: string;
	time: string;
	mode: string;
	audience: string;
	agenda: string[];
	organizer: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

const EventSchema = new Schema<Event>(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			maxlength: [100, "Title must be less than 100 characters"],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
			maxlength: [1000, "Description must be less than 1000 characters"],
		},
		overview: {
			type: String,
			required: [true, "Overview is required"],
			trim: true,
			maxlength: [500, "Overview must be less than 500 characters"],
		},
		image: {
			type: String,
			required: [true, "Image is required"],
			trim: true,
		},
		venue: {
			type: String,
			required: [true, "Venue is required"],
			trim: true,
		},
		location: {
			type: String,
			required: [true, "Location is required"],
			trim: true,
		},
		date: {
			type: String,
			required: [true, "Date is required"],
		},
		time: {
			type: String,
			required: [true, "Time is required"],
		},
		mode: {
			type: String,
			required: [true, "Mode is required"],
			enum: {
				values: ["online", "hybrid", "offline"],
				message: "Mode must be either online, hybrid, or offline",
			},
		},
		audience: {
			type: String,
			required: [true, "Audience is required"],
			trim: true,
		},
		agenda: {
			type: [String],
			required: [true, "Agenda is required"],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: "Agenda must be an array of strings",
			},
		},
		organizer: {
			type: String,
			required: [true, "Organizer is required"],
			trim: true,
		},
		tags: {
			type: [String],
			required: [true, "Tags is required"],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: "Tags must be an array of strings",
			},
		},
	},
	{ timestamps: true }
);

EventSchema.pre("save", function (next) {
	const event = this as Event;
	if (event.isModified("title") || event.isNew) {
		event.slug = generateSlug(event.title);
	}
	if (event.isModified("date")) {
		event.date = normalizeDate(event.date);
	}
	if (event.isModified("time")) {
		event.time = normalizeTime(event.time);
	}
	next();
});

function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function normalizeDate(date: string): string {
	if (isNaN(new Date(date).getTime())) {
		throw new Error("Invalid date format");
	}
	return new Date(date).toISOString().split("T")[0];
}

function normalizeTime(time: string): string {
	const timeRegex = /^(\d{1,2}):(\d{2})(\d{2})(\s*(AM|PM))?$/i;
	const match = time.trim().match(timeRegex);
	if (!match) {
		throw new Error("Invalid time format");
	}

	let hours = parseInt(match[1] || "0");
	const minutes = parseInt(match[2] || "0");
	const period = match[4]?.toUpperCase() || "AM";

	if (period) {
		if (period === "PM" && hours !== 12) hours += 12;
		if (period === "AM" && hours === 12) hours = 0;
	}

	if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
		throw new Error("Invalid time range");
	}
	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;
}

EventSchema.index({ slug: 1 }, { unique: true });

EventSchema.index({ date: 1, time: 1 });

const EventModel = models.Event || model<Event>("Event", EventSchema);

export default EventModel;
// EventSchema.post("save", function (error, doc, next) {
// 	if (error.name === "MongoServerError" && error.code === 11000) {
// 		next(new Error("Event with this title already exists"));
// 	} else {
// 		next(error);
// 	}
// });
