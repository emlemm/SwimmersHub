import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const mongoURI = process.env.MONGO_URI;

app.get("/message", (_, res) => res.send("Hello from express!"));

if (!mongoURI) {
  console.error('Missing MongoDB connection string in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    ViteExpress.listen(app, PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
