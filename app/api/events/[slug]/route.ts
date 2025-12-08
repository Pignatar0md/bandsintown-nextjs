import { NextRequest, NextResponse   } from "next/server";
import dbConnect from "@/lib/mongodb";
import EventModel from "@/database/event.model";
type RouteParams = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { slug } = await params;
        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return NextResponse.json(
                {
                    message: "Invalid slug",
                },
                { status: 400 }
            );
        }
        const sanitizedSlug = slug.trim().toLowerCase();
        const event = await EventModel.findOne({ slug: sanitizedSlug }).lean();
        if (!event) {
            return NextResponse.json(
                {
                    message: `Event with slug ${sanitizedSlug} not found`,
                },
                { status: 404 }
            );
        }
        return NextResponse.json({
            message: "Event retrieved successfully",
            event,
        }, { status: 200 });
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