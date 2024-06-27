import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		releaseDate: { type: String, required: true },
		brand: { type: String, required: true },
		model: { type: String, required: true },
		operatingSystem: { type: String, required: true },
		storageCapacity: { type: String, default: "32" },
		screenSize: {
			width: { type: Number, required: true },
			height: { type: Number, required: true },
		},
		cameraQuality: { type: String, required: true },
		batteryLife: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
