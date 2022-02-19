import MoviesDAO from "../models/moviesDAO.js";

export default class MoviesController {
	static async apiGetMovies(req, res, next) {
		const moviesPerPage = 20;
		const { moviesList, totalNumMovies } = await MoviesDAO.getMovies();
		let response = {
			movies: moviesList,
			page: 0,
			filters: {},
			entries_per_page: moviesPerPage,
			total_results: totalNumMovies,
		};
		res.json(response);
	}
}
