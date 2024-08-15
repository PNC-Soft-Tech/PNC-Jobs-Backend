import mongoose from "mongoose";
import http from "http";
import "colors";
import config from "./index";
import app from "../app";

export async function connectDb(): Promise<void> {
  let server: http.Server | null = null;

  try {
    // Establish connection to the MongoDB database
    await mongoose.connect(config.mongo_url as string);
    console.log("Successfully connected to the database".green.underline);

    // Create an HTTP server and start listening
    server = http.createServer(app);
    server.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`.yellow.underline);
    });
  } catch (error) {
    console.error(
      `Error connecting to the database or starting server: ${error}`.red
        .underline
    );
    process.exit(1); // Exit the process with failure
  }

  // Graceful shutdown on unhandled promise rejections
  process.on("unhandledRejection", (error: any) => {
    console.error(
      "Unhandled Rejection detected. Shutting down server...".red.underline
    );

    if (server) {
      server.close(() => {
        console.error(`Error: ${error.message}`.red.underline);
        process.exit(1);
      });
    } else {
      console.error(`Error: ${error.message}`.red.underline);
      process.exit(1);
    }
  });

  // Graceful shutdown on SIGTERM (e.g., from Docker or Kubernetes)
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...".blue.underline);

    if (server) {
      server.close(() => {
        console.log("Server shut down complete.".blue.underline);
        process.exit(0);
      });
    }
  });
}
