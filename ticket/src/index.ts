import mongoose from "mongoose";

import app from "./app";

const start = async () => {
  try {
    await mongoose.connect("mongodb://ticket-mongo-srv:27017/ticket");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

start();
