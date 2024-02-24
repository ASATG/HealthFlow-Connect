// Configuration for accessing the env file data
import dotenv from "dotenv";
dotenv.config();

// Express is required for creating the server
import express from "express";

// Cors is required for cross-site origin access
import cors from "cors";

// Importing the function for connection to database
import { connect_db } from "./db_scripts/db_connect.js";

// This will be used for connection with local mongo database
await connect_db(process.env.DATABASE_URL);

// Configuration for backend express server
const app = express();
const server_port = process.env.SERVER_PORT;

// Configuration for api interaction
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Setting up the server
app.listen(server_port, () => {
    return console.log(`Server is running at http://localhost:${server_port}`);
});