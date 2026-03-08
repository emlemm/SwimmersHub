import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/userRoutes"; 
import { router as swimmerRoutes } from "./routes/swimmerRoutes";
import { router as meetRoutes } from "./routes/meetRoutes";
import { router as raceRoutes } from "./routes/raceRoutes";
import { router as eventRoutes } from "./routes/eventRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Util } from "./utilities/index"
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


/* middleware */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(Util.checkJWTToken);

/* routes */
app.use('/user', userRoutes);
app.use('/swimmer', swimmerRoutes);
app.use('/meet', meetRoutes);
app.use('/race', raceRoutes);
app.use('/event', eventRoutes);