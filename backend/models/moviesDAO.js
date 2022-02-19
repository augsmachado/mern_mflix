import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let movies;

export default class MoviesDAO {
	// Establish connection handle in moviesDAO
	static async injectDB(conn) {
		if (movies) {
			return;
		}

		try {
			const database = await conn.db(process.env.MFLIX_NS);
			movies = database.collection("movies");
		} catch (err) {
			console.error(
				`Unable to establish connection handle in moviesDAO: ${err}`,
				err
			);
		}
	}

	static async getMovies({
		// here's where the default parameters are set for the getMovies method
		filters = null,
		page = 0,
		moviesPerPage = 20,
	} = {}) {
		let queryParams = {};
		if (filters) {
			if ("text" in filters) {
				queryParams = this.textSearchQuery(filters["text"]);
			} else if ("cast" in filters) {
				queryParams = this.castSearchQuery(filters["cast"]);
			} else if ("genre" in filters) {
				queryParams = this.genreSearchQuery(filters["genre"]);
			}
		}

		let { query = {}, project = {}, sort = DEFAULT_SORT } = queryParams;
		let cursor;
		try {
			cursor = await movies.find(query).project(project).sort(sort);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { moviesList: [], totalNumMovies: 0 };
		}

		/**
        Ticket: Paging
    
        Before this method returns back to the API, use the "moviesPerPage" and
        "page" arguments to decide the movies to display.
    
        Paging can be implemented by using the skip() and limit() cursor methods.
        */

		// TODO Ticket: Paging
		// Use the cursor to only return the movies that belong on the current page
		const displayCursor = cursor.limit(moviesPerPage);

		try {
			const moviesList = await displayCursor.toArray();
			const totalNumMovies =
				page === 0 ? await movies.countDocuments(query) : 0;

			return { moviesList, totalNumMovies };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { moviesList: [], totalNumMovies: 0 };
		}
	}
}
