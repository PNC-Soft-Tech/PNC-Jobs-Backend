import mongoose from "mongoose";
import { ISell } from "./sell.interface";
import Sell from "./sell.model";
import AppError from "../../../error/AppError";
import Product from "../Product/product.model";

export const createSell = async (sell: ISell) => {
	// res.json({
	// 	success: true,
	// 	message: "Sell created successfully",
	// 	data: result,
	// });
};

export const getAllSells = async () => {
	const sells = await Sell.find().populate({
		path: "productId",
		model: "Product",
	});
	return sells;
};

export const getSellById = async (id: string) => {
	const sell = await Sell.findById(id);
	return sell;
};

export const updateSell = async (id: string, updatedSell: ISell) => {
	const updated = await Sell.findByIdAndUpdate(id, updatedSell, {
		new: true,
	});
	return updated;
};

export const deleteSell = async (id: string) => {
	const deleted = await Sell.findByIdAndRemove(id);
	return deleted;
};

export const SellServices = {
	createSell,
	getAllSells,
	getSellById,
	updateSell,
	deleteSell,
};
