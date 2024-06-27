import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/sales-money", ProductController.getSalesMoneyAccordingToTime);
router.get("/recent", ProductController.getRecentProducts);
router.get("/sell/:id", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export const productRouter = router;
