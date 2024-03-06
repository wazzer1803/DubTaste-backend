import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";

mongoose
  .connect("mongodb+srv://sahilchauksey:sahilchauksey@cluster0.2q08kke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: "dz0owrfyb",
  api_key: "748165842681447",
  api_secret: "hUZDMOjgDQbr-Dp3bhj7ulpSPak",
});

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/web/api/my/user", myUserRoute);
app.use("/web/api/my/restaurant", myRestaurantRoute);
app.use("/web/api/restaurant", restaurantRoute);
app.use("/web/api/order", orderRoute);

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
