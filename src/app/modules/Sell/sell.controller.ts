import { Request, Response } from "express";
import { SellServices } from "./sell.service";
import catchAsync from "../../../shared/catchAsync";
import { ProductServices } from "../Product/product.service";
import AppError from "../../../error/AppError";
import { IProduct } from "../Product/product.interface";
import mongoose from "mongoose";
import Sell from "./sell.model";
import Product from "../Product/product.model";

export const createSell = async (req: Request, res: Response) => {
	const { productId, quantity } = req.body;
	console.log("product~", req.body);
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const product = await Product.findById(productId).session(session);
		console.log("product~", product);
		if (!product) {
			throw new AppError(404, "Product not found");
		}

		if (product.quantity < quantity) {
			throw new AppError(404, "Product is out of stock");
		}
		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{
				quantity: product.quantity - quantity,
			},
			{
				new: true,
			}
		).session(session);
		console.log("update-product~", updatedProduct);

		const result = await Sell.create([req.body], {
			session: session,
		});
		await session.commitTransaction();
		res.json({
			success: true,
			message: "Sell created successfully",
			data: result,
		});
	} catch (error: any) {
		await session.abortTransaction();
		res.json({
			success: false,
			message: error.message,
			status: 500,
		});
	}
};

export const getAllSells = async (req: Request, res: Response) => {
	try {
		let page: number = 1;
		let limit: number = 10;

		if (req.query?.page) {
			page = +req.query?.page;
		}
		if (req.query?.limit) {
			limit = +req.query?.limit;
		}
		const skip = (page - 1) * limit;
		const sells = await Sell.find()
			.populate({
				path: "productId",
				model: "Product",
			})
			.skip(skip)
			.limit(limit);
		const length = await Sell.countDocuments();
		res.json({
			success: true,
			data: sells,
			limit: limit,
			page: page,
			size: length,
		});
	} catch (error: any) {
		res.json({
			success: false,
			message: error.message,
		});
	}
};

export const getDashboardStatistics = async (req: Request, res: Response) => {
	try {
		const totalSalesResult = await Sell.aggregate([
			{
				$group: {
					_id: null,
					totalSales: { $sum: "$quantity" },
				},
			},
		]);
		const totalSales = totalSalesResult[0] ? totalSalesResult[0].totalSales : 0;

		const totalSalesPriceResult = await Sell.aggregate([
			{
				$group: {
					_id: null,
					totalSales: { $sum: "$price" },
				},
			},
		]);

		const totalSalesPrice = totalSalesPriceResult[0]
			? totalSalesPriceResult[0].totalSales
			: 0;

		const totalBuyersResult = await Sell.aggregate([
			{
				$group: {
					_id: "$buyerName",
				},
			},
			{
				$group: {
					_id: null,
					totalBuyers: { $sum: 1 },
				},
			},
		]);
		const totalBuyers = totalBuyersResult[0]
			? totalBuyersResult[0].totalBuyers
			: 0;

		const totalPriceResult = await Product.aggregate([
			{
				$group: {
					_id: null,
					totalPrice: { $sum: "$price" },
				},
			},
		]);

		const totalPrice = totalPriceResult[0] ? totalPriceResult[0].totalPrice : 0;

		const totalQuantityResult = await Product.aggregate([
			{
				$group: {
					_id: null,
					totalQuantity: { $sum: "$quantity" },
				},
			},
		]);

		const totalQuantity = totalQuantityResult[0]
			? totalQuantityResult[0].totalQuantity
			: 0;

		res.json({
			success: true,
			totalSales: totalSales,
			totalBuyers: totalBuyers,
			totalQuantity,
			totalPrice,
			totalSalesPrice,
		});
	} catch (error: any) {
		res.json({
			success: false,
			message: error.message,
		});
	}
};

export const getSellById = catchAsync(async (req: Request, res: Response) => {
	const sell = await SellServices.getSellById(req.params.id);
	if (!sell) {
		res.status(404).json({
			success: false,
			message: "Sell not found",
		});
	} else {
		res.json({
			success: true,
			data: sell,
		});
	}
});

export const updateSell = catchAsync(async (req: Request, res: Response) => {
	const result = await SellServices.updateSell(req.params.id, req.body);
	res.json({
		success: true,
		message: "Sell updated successfully",
		data: result,
	});
});

export const deleteSell = catchAsync(async (req: Request, res: Response) => {
	const result = await SellServices.deleteSell(req.params.id);
	res.json({
		success: true,
		message: "Sell deleted successfully",
		data: result,
	});
});

export const SellController = {
	createSell,
	getAllSells,
	getSellById,
	updateSell,
	deleteSell,
	getDashboardStatistics,
};
