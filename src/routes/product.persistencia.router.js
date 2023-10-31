import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

// rutas para productos
router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
