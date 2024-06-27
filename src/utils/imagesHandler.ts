import * as express from "express";
import multer from "multer";
// import * as sharp from 'sharp';
import * as fs from "fs";

class ImagesManagers {
	private storage: multer.StorageEngine;
	public upload: multer.Multer;

	constructor() {
		this.storage = multer.diskStorage({
			destination: "./images",
			filename: (req, file, callback) => {
				callback(null, file.originalname);
			},
		});

		this.upload = multer({
			storage: this.storage,
			fileFilter: this.fileFilter,
		});
	}

	private fileFilter(
		req: express.Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	) {
		// Implement your file filter logic here
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new Error("Only images are allowed"));
		}
	}
	public uploadMultiple(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const multipleUpload = this.upload.array("images", 10); //

		multipleUpload(req, res, (err: any) => {
			if (err instanceof multer.MulterError) {
				return res
					.status(400)
					.json({ error: "Upload error", message: err.message });
			} else if (err) {
				return res
					.status(500)
					.json({ error: "Internal server error", message: err.message });
			}

			// File upload successful, perform any additional processing (e.g., image resizing)
			// Example: this.resizeImage(req.file.path);

			res.status(200).json({ message: "File uploaded successfully" });
		});
	}
}
