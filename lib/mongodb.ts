import mongoose from 'mongoose';

//both commented and uncommented code works just fine,we used ai to generate the code, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;


// Initialize the cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
   console.log("🧠 MongoDB cache initialized on global object");
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    console.log("✅ MongoDB already connected (using cached connection)");
    return cached.conn;
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    // Validate MongoDB URI exists
    if (!MONGODB_URI) {
      console.error("❌ MONGODB_URI is missing");
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }

    console.log("⏳ Connecting to MongoDB...");

    const options = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
      console.log("🎉 MongoDB connection established");
      return mongoose;
    }).catch((error) => {
        console.error("❌ MongoDB connection failed", error);
        throw error;
      });
  } else {
    console.log("⏳ MongoDB connection already in progress...");
  }

  try {
    // Wait for the connection to establish
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;


// import mongoose, { Connection } from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local",
//   );
// }

// interface CachedConnection {
//   conn: Connection | null;
//   promise: Promise<typeof mongoose> | null;
// }

// // Use global namespace to cache the connection across module reloads in development
// declare global {
//   // eslint-disable-next-line no-var
//   var mongooseCache: CachedConnection | undefined;
// }

// const cached: CachedConnection = global.mongooseCache || {
//   conn: null,
//   promise: null,
// };

// if (!global.mongooseCache) {
//   global.mongooseCache = cached;
// }

// /**
//  * Connect to MongoDB using Mongoose
//  * Caches the connection to prevent multiple connections during development
//  * @returns Promise resolving to the Mongoose instance
//  */
// async function connectDB(): Promise<typeof mongoose> {
//   // Return existing connection if available
//   if (cached.conn) {
//     return mongoose;
//   }

//   // Return pending connection promise if already initiated
//   if (cached.promise) {
//     return cached.promise;
//   }

//   // Create new connection promise
//   cached.promise = mongoose.connect(MONGODB_URI!, {
//     bufferCommands: false,
//   });

//   try {
//     cached.conn = (await cached.promise).connection;
//   } catch (error) {
//     cached.promise = null;
//     throw error;
//   }

//   return cached.promise;
// }

// export default connectDB;


// //step 9,using a prompt or the prompt below to generate mongodb connection and database connection file, event model and booking model with validation and indexing, you can use junie or ai to generate this code

// // You are a backend developer working on a Next.js application with Mongoose and TypeScript. 

// // Your task is to,
// // - Create a new file `lib/mongodb.ts` in the lib folder of a Next.js application. 
// // - Set up a Mongoose database connection to MongoDB using TypeScript with proper types (avoid using any). 
// // - Cache the connection to prevent multiple connections during development. 
// // - Write clear and concise comments explaining key parts of the code. 
// // - Make sure the code is clean, readable, and production-ready.

// // You are a backend developer working on a Next.js application with Mongoose and TypeScript. Your task is to build a database layer with two Mongoose models, `Event` and `Booking` in a new `database` folder.You must create exactly three files:1. `event.model.ts`
// // 2. `booking.model.ts`
// // 3. `index.ts`

// // 1. `database/event.model.ts`

// // Create a strongly typed Mongoose schema and model called Event with the following fields:

// // - `title` – string, required
// // - `slug` – string, unique, auto-generated from title
// // - `description` – string, required
// // - `overview` – string, required
// // - `image` – string, required
// // - `venue` – string, required
// // - `location` – string, required
// // - `date` – string, required
// // - `time` – string, required
// // - `mode` – string (e.g., online, offline, hybrid), required
// // - `audience` – string, required
// // - `agenda` – array of strings, required
// // - `organizer` – string, required
// // - `tags` – array of strings, required
// // - `createdAt` – date, auto-generated
// // - `updatedAt` – date, auto-generated

// // Requirements:

// // - Use a pre-save hook to automatically generate a URL-friendly slug from the title.
// // - Only regenerate the slug if the title changes.
// // - In the same pre-save hook, validate and normalize the `date` to ISO format and ensure `time` is stored in a consistent format.
// // - Validate that required fields are present and non-empty.
// // - Add a unique index to the slug.
// // - Enable automatic timestamps.
// // - Use strict TypeScript types (no `any`).
// // - Write concise comments explaining key logic such as slug generation, date formatting, and validation.

// // 2. `database/booking.model.ts`

// // Create a strongly typed Mongoose schema and model called Booking with the following fields:

// // - `eventId` – ObjectId (reference to `Event`), required
// // - `email` – string, required, must be a valid email
// // - `createdAt` – date, auto-generated
// // - `updatedAt` – date, auto-generated

// // Requirements:

// // - In a pre-save hook, verify that the referenced `eventId` corresponds to an existing `Event`. Throw an error if the event does not exist.
// // - Validate that `email` is properly formatted.
// // - Add an index on `eventId` for faster queries.
// // - Enable automatic timestamps.
// // - Use strong TypeScript types throughout.
// // - Include concise comments explaining pre-save validation and schema design decisions.

// // 3. `database/index.ts`

// // - Export both `Event` and `Booking` models so they can be imported anywhere in the application from a single file.

// // ---

// // ✅ Final Deliverable:

// // - Exactly three files: `event.model.ts`, `booking.model.ts`, and `index.ts`.
// // - Each model must use pre-save hooks for slug generation, date normalization, and reference validation.
// // - Code should be production-grade, clean, type-safe, and clear to understand.
// // - Include only meaningful, concise comments — no unnecessary explanations.
