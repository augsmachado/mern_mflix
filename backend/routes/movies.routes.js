import express from "express";
import MoviesCtrl from "../controllers/movies.controllers.js";

const router = express.Router();

router.route("/").get(MoviesCtrl.apiGetMovies);
//router.route("/search").get(MoviesCtrl.apiSearchMovies)
//router.route("/countries").get(MoviesCtrl.apiGetMoviesByCountry)
//router.route("/facet-search").get(MoviesCtrl.apiFacetedSearch)
//router.route("/id/:id").get(MoviesCtrl.apiGetMovieById)
//router.route("/config-options").get(MoviesCtrl.getConfig)

/*router
  .route("/comment")
  .post(CommentsCtrl.apiPostComment)
  .put(CommentsCtrl.apiUpdateComment)
  .delete(CommentsCtrl.apiDeleteComment)
*/
export default router;
