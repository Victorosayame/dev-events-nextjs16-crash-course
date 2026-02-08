//step10 define and build api routes to fetch event data from mongodb

import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { fetchAllEvents } from "@/lib/actions/event.actions";

//route to create an event
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    //after connecting to db,we want to get access to the form data that we are going to pass into the request
    const formData = await req.formData();
    //in express it will be req.body but in nextjs 16 we have to use formData() method to get access to the form data

    //parse form data
    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON data format", error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
    }

    //step12 we want to get the uploaded image file from the form data and upload it to cloudinary, then get the image url and save it in the database, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.
    const file = formData.get('image') as File;

    if(!file) {
      return NextResponse.json({ message: "Image file is required" }, { status: 400 });
    }

    let tags = JSON.parse(formData.get('tags') as string);
    let agenda = JSON.parse(formData.get('agenda') as string);

    //if we have a file we convert it to a buffer and upload it to cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image', folder: "DevEvent" }, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }).end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url; // Save the image URL in the event data

    //if event is parsed through successfully,we can now save it to the database
    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json({ message: "Event Created Successfully", event: createdEvent }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Event Creation Failed", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

//step13 define a GET route to fetch all events from the database
export async function GET() {
  try {
    await connectDB();

    const events = await fetchAllEvents(); // Fetch all events using the action function, which includes sorting by creation date (newest first)

    return NextResponse.json({ message: "Events Fetched Successfully", events }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Event Fetching Failed", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}