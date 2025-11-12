import express from "express";
import {
  createService,
  deleteService,
  getAllMyService,
  getAllServices,
  getServicesByCategory,
  getServicesByPrice,
  getServicesBySearch,
  getSingleService,
  updateService,
} from "../controllers/serviceController.js";

const servicesRouter = express.Router();

// Public GET routes
servicesRouter.get("/all", getAllServices);
servicesRouter.get("/search", getServicesBySearch);
servicesRouter.get("/category", getServicesByCategory);
servicesRouter.get("/price", getServicesByPrice);

// Protected routes
servicesRouter.get("/my-services", getAllMyService);
servicesRouter.post("/", createService);
servicesRouter.get("/:id", getSingleService);
servicesRouter.patch("/:id", updateService);
servicesRouter.delete("/:id", deleteService);

export default servicesRouter;
