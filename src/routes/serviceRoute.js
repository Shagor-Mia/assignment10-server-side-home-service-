import express from "express";
import {
  createService,
  deleteService,
  getAllMyService,
  getAllServices,
  getServicesByCategory,
  getServicesByPage,
  getServicesByPrice,
  getServicesBySearch,
  getServicesSorted,
  getSingleService,
  updateService,
} from "../controllers/serviceController.js";

const servicesRouter = express.Router();

// Public GET routes
servicesRouter.get("/all", getAllServices);
servicesRouter.get("/:id", getSingleService);

servicesRouter.get("/page", getServicesByPage);
servicesRouter.get("/search", getServicesBySearch);
servicesRouter.get("/category", getServicesByCategory);
servicesRouter.get("/price", getServicesByPrice);
servicesRouter.get("/sort", getServicesSorted);

// Protected routes
servicesRouter.get("/my-services", getAllMyService);
servicesRouter.post("/", createService);
servicesRouter.patch("/:id", updateService);
servicesRouter.delete("/:id", deleteService);

export default servicesRouter;
