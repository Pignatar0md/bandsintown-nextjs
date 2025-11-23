import mongoose from "mongoose";

type MongooseCache = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
};

declare global {
	var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

const cached: MongooseCache = global.mongooseCache ?? {
	conn: null,
	promise: null,
};

if (!global.mongooseCache) {
	global.mongooseCache = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
	if (!MONGODB_URI) {
		throw new Error("Defined MONGODB_URI in .env file");
	}

	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		const options = {
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI as string, options)
			.then((mongoose) => {
				return mongoose;
			});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}
	return cached.conn;
}

export default dbConnect;
