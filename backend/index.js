import mongodb from "mongodb";
import dotenv from "dotenv";

import app from "./server.js";

import CommentsDAO from "./models/commentsDAO.js";
import MoviesDAO from "./models/moviesDAO.js";
import SessionsDAO from "./models/sessionsDAO.js";
import TheatersDao from "./models/theatersDAO.js";
import UsersDAO from "./models/usersDAO.js";

// Define .env config
dotenv.config();
const MongoClient = mongodb.MongoClient;

// Define port connection
const port = process.env.PORT || 8000;

// Define connection with database
MongoClient.connect(process.env.MFLIX_DB_URI, {
	useNewUrlParser: true,
	wtimeoutMS: 2500,
	maxPoolSize: 50,
})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await MoviesDAO.injectDB(client);

		app.listen(port, () => {
			console.log(`Database is running on port: ${port}`);
		});
	});
