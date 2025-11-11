import { ObjectId } from "mongodb";
import { client } from "../config/database.js";

const db = client.db("HouseHold_Service");
const bookingsCollection = db.collection("Booking");
const servicesColl = db.collection("Service");

// Book a Service
export const bookService = async (req, res) => {
  try {
    const { serviceId, bookingDate, price } = req.body;
    const userEmail = req.user.email;

    if (!serviceId || !bookingDate || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const service = await servicesCollection.findOne({
      _id: new ObjectId(serviceId),
    });
    if (!service) return res.status(404).json({ message: "Service not found" });

    const newBooking = {
      userEmail,
      serviceId,
      serviceName: service.serviceName,
      providerEmail: service.email,
      bookingDate,
      price,
      status: "booked",
      createdAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(newBooking);
    res.status(201).json({ message: "Service booked successfully", result });
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
