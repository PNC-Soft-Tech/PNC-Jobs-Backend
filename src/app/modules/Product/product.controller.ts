import { Request, Response, query } from "express";
import { ProductServices } from "./product.service";
import catchAsync from "../../../shared/catchAsync";
import Product from "./product.model";
import Sell from "../Sell/sell.model";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.createProduct(req.body);
	res.json({
		success: true,
		message: "Product created successfully",
		data: result,
	});
});

export const getAllProducts = async (req: Request, res: Response) => {
	let page: number = 1;
	let limit: number = 10;
	if (req.query?.page) {
		page = +req.query?.page;
	}
	if (req.query?.limit) {
		limit = +req.query?.limit;
	}
	const skip = (page - 1) * limit;
	let query = {};
	let cond = [];
	const fields = [
		"model",
		"brand",
		"operatingSystem",
		"storageCapacity",
		"releaseDate",
		"name",
	];
	if (req.query?.queryString) {
		let queryString: string = req.query.queryString as string;
		if (queryString && queryString[queryString.length - 1] === "=") {
			queryString = queryString.slice(0, queryString.length - 1) as string;
		}

		console.log(queryString);

		let queryFieldsValue: {
			searchTerm: string;
			brand: string;
			model: string;
			operatingSystem: string;
			price: number;
			storageCapacity: string;
			releaseDate: string;
			name: string;
		} = JSON.parse(queryString);
		const {
			searchTerm,
			brand,
			model,
			operatingSystem,
			price,
			storageCapacity,
			releaseDate,
			name,
		} = queryFieldsValue;

		if (brand) {
			cond.push({
				brand: {
					$regex: brand,
					$options: "i",
				},
			});
		}

		if (model) {
			cond.push({
				model: {
					$regex: model,
					$options: "i",
				},
			});
		}

		if (operatingSystem) {
			cond.push({
				operatingSystem: {
					$regex: operatingSystem,
					$options: "i",
				},
			});
		}
		if (name) {
			cond.push({
				name: {
					$regex: name,
					$options: "i",
				},
			});
		}
		if (storageCapacity) {
			cond.push({
				storageCapacity: {
					$regex: storageCapacity,
					$options: "i",
				},
			});
		}

		if (+price > 0) {
			cond.push({
				price: {
					$lte: price,
				},
			});
		}
		if (releaseDate) {
			// let temp = new Date(releaseDate);
			// console.log(temp);
			cond.push({
				releaseDate: {
					$regex: releaseDate,
				},
			});
		}

		if (req.query?.screenSize) {
			let screenSize: string = req.query?.screenSize as string;

			let { width, height } = JSON.parse(screenSize);

			if (width && height) {
				cond.push({
					screenSize: {
						width: {
							$lte: width,
						},
						height: {
							$lte: height,
						},
					},
				});
			}
			console.log(screenSize, width, height);
		}

		if (searchTerm) {
			fields.forEach((item) => {
				cond.push({
					[item]: {
						$regex: searchTerm,
						$options: "i",
					},
				});
			});
		}
		console.log(cond);
		if (cond.length > 0) {
			query = {
				...query,
				$or: cond,
			};
		}
	}

	try {
		const products = await Product.find(query).skip(skip).limit(limit);
		const length = await Product.countDocuments(query);
		res.json({
			success: true,
			data: products,
			limit: limit,
			page: page,
			size: length,
		});
	} catch (error: any) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error?.message,
		});
	}
};

export const getSalesMoneyAccordingToTime = async (
	req: Request,
	res: Response
) => {
	var today = new Date();
	today.setHours(0, 0, 0, 0);

	var first = today.getDate() - today.getDay();
	var firstDayWeek = new Date(today);
	firstDayWeek.setDate(first);
	var lastDayWeek = new Date(today);
	lastDayWeek.setDate(first + 6);
	lastDayWeek.setHours(23, 59, 59, 0);

	var firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	lastDayMonth.setHours(23, 59, 59, 0);
	try {
		const data = await Sell.aggregate([
			{
				$group: {
					_id: "",
					today: {
						$push: {
							$cond: {
								if: {
									$gte: ["$createdAt", new Date(today)],
								},
								then: "$$ROOT",
								else: "",
							},
						},
					},
					week: {
						$push: {
							$cond: [
								{
									$and: [
										{
											$gte: ["$createdAt", new Date(firstDayWeek)],
										},
										{
											$lte: ["$createdAt", new Date(lastDayWeek)],
										},
									],
								},
								"$$ROOT",
								"",
							],
						},
					},
					month: {
						$push: {
							$cond: [
								{
									$and: [
										{
											$gte: ["$createdAt", new Date(firstDayMonth)],
										},
										{
											$lte: ["$createdAt", new Date(lastDayMonth)],
										},
									],
								},
								"$$ROOT",
								"",
							],
						},
					},
				},
			},
		]);
		res.json({
			success: true,
			data: data,
		});
	} catch (error: any) {
		res.json({
			success: false,
			message: error.message,
		});
	}
};
export const getRecentProducts = async (req: Request, res: Response) => {
	const products = await Product.find()
		.sort({
			createdAt: -1,
		})
		.limit(5);
	res.json({
		success: true,
		data: products,
	});
};

export const getProductById = catchAsync(
	async (req: Request, res: Response) => {
		const product = await ProductServices.getProductById(req.params.id);
		if (!product) {
			res.status(404).json({
				success: false,
				message: "Product not found",
			});
		} else {
			res.json({
				success: true,
				data: product,
			});
		}
	}
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.updateProduct(req.params.id, req.body);
	res.json({
		success: true,
		message: "Product updated successfully",
		data: result,
	});
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.deleteProduct(req.params.id);
	res.json({
		success: true,
		message: "Product deleted successfully",
		data: result,
	});
});

export const ProductController = {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	getRecentProducts,
	getSalesMoneyAccordingToTime,
};
