import express from "express";
import { SellController } from "./sell.controller";

const router = express.Router();

router.post("/", SellController.createSell);
router.get("/", SellController.getAllSells);
router.get("/statistics", SellController.getDashboardStatistics);
router.get("/sell/:id", SellController.getAllSells);
router.get("/:id", SellController.getSellById);
router.put("/:id", SellController.updateSell);
router.delete("/:id", SellController.deleteSell);

export const sellRouter = router;
