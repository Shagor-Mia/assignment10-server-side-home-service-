import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import servicesRouter from "./routes/serviceRoute.js";
import bookingRouter from "./routes/bookingRouter.js";

const app = express();

app.get("/", (req, res) => {
  res.send("household service server working.");
});

app.use(cors());
app.use(express.json());

app.use("/service", servicesRouter);
app.use("/bookings", bookingRouter);

connectDB();

export default app;
