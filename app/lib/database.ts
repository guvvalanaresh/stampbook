import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnection() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    console.log('Connecting to MongoDB...');
    mongoose.set('strictQuery', true);
    
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', {
          message: error.message,
          code: error.code,
          name: error.name,
          stack: error.stack
        });
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log('Database connection established');
    return cached.conn;
  } catch (e: any) {
    cached.promise = null;
    console.error('Error in dbConnection:', {
      message: e.message,
      code: e.code,
      name: e.name,
      stack: e.stack
    });
    throw e;
  }
}
