import { ObjectId } from "mongodb";
import { client } from "../config/database.js";

const db = client.db("HouseHold_Service");
const servicesColl = db.collection("Service");

//
export const getAllServices = async (req, res) => {
  try {
    const items = await servicesColl.find().toArray();
    res.send(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleService = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await servicesColl.findOne({ _id: new ObjectId(id) });

    if (!item) return res.status(404).json({ message: "Service not found" });

    res.send(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all services (with pagination default page=1, limit=12)
export const getServicesByPage = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const cursor = servicesColl.find().skip(skip).limit(limit);
    const total = await servicesColl.countDocuments();
    const items = await cursor.toArray();

    res.json({ total, page, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET services by search (title, category, description)
export const getServicesBySearch = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search)
      return res.status(400).json({ message: "Missing search query" });

    const regex = new RegExp(search, "i");
    const items = await servicesColl
      .find({
        $or: [{ title: regex }, { category: regex }, { description: regex }],
      })
      .toArray();

    res.json({ total: items.length, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET services by category
export const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category)
      return res.status(400).json({ message: "Missing category query" });

    const items = await servicesColl.find({ category }).toArray();
    res.json({ total: items.length, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET services by price range
export const getServicesByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    if (!minPrice && !maxPrice)
      return res.status(400).json({ message: "Missing price range" });

    const query = { price: {} };
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const items = await servicesColl.find(query).toArray();
    res.json({ total: items.length, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET services sorted
export const getServicesSorted = async (req, res) => {
  try {
    const { sort } = req.query;
    if (!sort) return res.status(400).json({ message: "Missing sort query" });

    let sortObj = {};
    if (sort === "price_asc") sortObj = { price: 1 };
    else if (sort === "price_desc") sortObj = { price: -1 };
    else if (sort === "rating") sortObj = { avgRating: -1 };
    else return res.status(400).json({ message: "Invalid sort query" });

    const items = await servicesColl.find().sort(sortObj).toArray();
    res.json({ total: items.length, items });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /services (protected)
export const createService = async (req, res) => {
  try {
    const newService = req.body;
    // newService.providerEmail = req.userEmail; // enforce provider email
    // newService.createdAt = new Date();
    // newService.reviews = [];
    // newService.avgRating = 0;
    // newService.ratingsCount = 0;

    const result = await servicesColl.insertOne(newService);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Insert failed" });
  }
};

// PATCH /services/:id (owner only)
export const updateService = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const service = await servicesColl.findOne({ _id: id });
    if (!service) return res.status(404).json({ message: "Not found" });
    if (service.providerEmail !== req.userEmail)
      return res.status(403).json({ message: "Forbidden" });

    const update = { $set: req.body };
    const result = await servicesColl.updateOne({ _id: id }, update);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// GET /services/my-services?email=user@example.com
export const getAllMyService = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email)
      return res.status(400).json({ message: "Missing provider email" });

    const items = await servicesColl.find({ providerEmail: email }).toArray();

    res.send(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /services/:id (owner only)
export const deleteService = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const service = await servicesColl.findOne({ _id: id });
    if (!service) return res.status(404).json({ message: "Not found" });
    if (service.providerEmail !== req.userEmail)
      return res.status(403).json({ message: "Forbidden" });

    const result = await servicesColl.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
