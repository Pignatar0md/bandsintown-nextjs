import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import EventModel from '@/database/event.model';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();

        let event;
        try {
            event = Object.fromEntries(formData.entries());

        } catch (e) {
            return NextResponse.json(
                { message: "Invalid JSON data format" },
                { status: 400 }
            );
        }
        const file = formData.get('image') as File;
        if (!file) {
            return NextResponse.json(
                { message: "Image is required" },
                { status: 400 }
            );
        }
        let tags = JSON.parse(formData.get('tags') as string);
        let agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'image',
                folder: 'nextjs_app',
            }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });
        event.image = (uploadResult as { secure_url: string }).secure_url;
        const createdEvent = await EventModel.create({ ...event, tags: tags, agenda: agenda });
        return NextResponse.json(
            { message: "Event created successfully", event: createdEvent },
            { status: 201 }
        );
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {
                message: "Event creation failed",
                error: e instanceof Error ? e.message : "Unknown"
            },
            { status: 400 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const events = await EventModel.find().sort({ createdAt: -1 });
        
        return NextResponse.json(
            { message: "Events retrieved successfully", events },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            {
                message: "Event retrieval failed",
                error: e instanceof Error ? e.message : e
            },
            { status: 500 }
        );
    }
}