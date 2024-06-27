export type IProduct = {
	name: string;
	price: number; // Assuming a numeric price
	quantity: number; // Assuming a numeric quantity
	releaseDate: string; // Assuming a string format for the release date
	brand: string;
	model: string;
	operatingSystem: string;
	storageCapacity: string;
	screenSize: {
		width: number;
		height: number;
	};
	cameraQuality: string;
	batteryLife: string;
};
