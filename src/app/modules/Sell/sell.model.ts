import { Schema, model } from "mongoose";
import { ISell } from "./sell.interface";

const sellSchema = new Schema<ISell>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		buyerName: {
			type: String,
			required: true,
		},
		saleDate: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Sell = model<ISell>("Sell", sellSchema);
export default Sell;
