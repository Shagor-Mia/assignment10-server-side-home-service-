import express from "express";
import {
  addReview,
  bookService,
  deleteBooking,
  getMyBookings,
} from "../controllers/bookingController.js";
import { verifyFireBaseToken } from "../middlewares/verifyFirebaseToken.js";

const bookingRouter = express.Router();

bookingRouter.post("/", bookService);
bookingRouter.get("/my-bookings", getMyBookings);
bookingRouter.delete("/:id", deleteBooking);
bookingRouter.post("/review/:serviceId", verifyFireBaseToken, addReview);

export default bookingRouter;
