import express from "express";
import {
  addReview,
  bookService,
  deleteBooking,
  getMyBookings,
} from "../controllers/bookingController";

const bookingRouter = express.Router();

bookingRouter.post("/", bookService);

export default bookingRouter;
