import express, { json, request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(225).send("Good Vibes");
});

app.use("/", bookRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error"); //error connecting to database
  });
