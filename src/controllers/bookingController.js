import { ObjectId } from "mongodb";
import { client } from "../config/database.js";

const db = client.db("HouseHold_Service");
const bookingsCollection = db.collection("Booking");
const servicesCollection = db.collection("Service");

// Book a Service
export const bookService = async (req, res) => {
  try {
    const { serviceId, bookingDate, price, userEmail } = req.body;

    // Basic validation
    if (!serviceId || !bookingDate || !price || !userEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Check for duplicate booking by the same user
    const existingBooking = await bookingsCollection.findOne({
      serviceId: serviceId,
      userEmail: userEmail,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this service",
      });
    }
    //Find service info
    const service = await servicesCollection.findOne({
      _id: new ObjectId(serviceId),
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Create booking object
    const newBooking = {
      userEmail,
      serviceId,
      serviceName: service.serviceName,
      providerEmail: service.providerEmail,
      image: service.image,
      bookingDate,
      price,
      status: "booked",
      createdAt: new Date(),
    };

    // Insert booking
    const result = await bookingsCollection.insertOne(newBooking);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all bookings for a specific user (by email query)

export const getMyBookings = async (req, res) => {
  try {
    const userEmail = req.query.email; // get from query, not req.user

    if (!userEmail) {
      return res.status(400).json({ message: "Missing email in query" });
    }

    const bookings = await bookingsCollection
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cancel/Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    // const userEmail = req.user.email;

    const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // if (booking.userEmail !== userEmail) {
    //   return res.status(403).json({ message: "Unauthorized delete attempt" });
    // }

    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send(result);
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add Review
export const addReview = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const { rating, comment } = req.body;
    const userEmail = req.user.email;

    const review = {
      userEmail,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    const result = await servicesCollection.updateOne(
      { _id: new ObjectId(serviceId) },
      { $push: { reviews: review } }
    );

    res.json(result);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
