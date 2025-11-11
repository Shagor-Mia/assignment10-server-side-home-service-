import express from "express";
import {
  addReview,
  bookService,
  deleteBooking,
  getMyBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", bookService);
bookingRouter.get("/my-bookings", getMyBookings);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
