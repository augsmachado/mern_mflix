import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import movies from "./routes/movies.routes.js";

const app = express();

app.use(cors());

process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Register API routes
app.use("/api/v1/movies", movies);
app.use("*", (req, res) => {
	res.status(404).json({
		error: "Not route found",
	});
});

export default app;
