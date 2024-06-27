import { Request } from "express";
import { IProduct } from "./product.interface";
import Product from "./product.model";

export const createProduct = async (product: IProduct) => {
	const savedProduct = await Product.create(product);
	return savedProduct;
};

export const getAllProducts = async (req: Request) => {
	let page: number = 1;
	let limit: number = 10;

	if (req.query?.page) {
		page = +req.query?.page;
	}
	if (req.query?.limit) {
		limit = +req.query?.limit;
	}
	const skip = (page - 1) * limit;
	const products = await Product.find().skip(skip).limit(limit);
	return products;
};

export const getProductById = async (id: string) => {
	const product = await Product.findById(id);
	return product;
};

export const updateProduct = async (
	id: string,
	updatedProduct: Partial<IProduct>
) => {
	const updated = await Product.findByIdAndUpdate(id, updatedProduct, {
		new: true,
	});
	return updated;
};

export const deleteProduct = async (id: string) => {
	const deleted = await Product.findByIdAndRemove(id);
	return deleted;
};

export const ProductServices = {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
