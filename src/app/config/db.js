import mongoose from "mongoose";

const dbstring = process.env.CONNECTION_STRING;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(dbstring, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
