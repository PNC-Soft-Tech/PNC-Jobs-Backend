import { Schema } from "mongoose";

export type ISell = {
	productId: Schema.Types.ObjectId;
	name: string;
	quantity: number;
	price: number;
	buyerName: string;
	saleDate: string;
};
