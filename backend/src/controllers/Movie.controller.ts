import { Request, Response, NextFunction } from "express";
import { MovieService } from "../services/movie/movie.service";
import { createMovieSchema, updateMovieSchema } from "../services/movie/movie.validation.schema";

export class MovieController {
  public async findMovieById(req: Request, res: Response, next: NextFunction) {
    try {
      const movieService = new MovieService();
      const movie = await movieService.findById(req.params.id);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        movie,
      });
    } catch (err) {
      next(err);
    }
  }

  public async findAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      let page: number = req.query.page
        ? parseInt(req.query.page as string)
        : 1;
      let limit: number = req.query.limit
        ? parseInt(req.query.limit as string)
        : 20;
      let order: number = req.query.order
        ? (req.query.order as string) === "asc"
          ? 1
          : -1
        : -1;
      let sort = req.query.sort ? (req.query.sort as string) : "updatedAt";

      if (Number.isNaN(page) || page <= 0) page = 1;
      if (Number.isNaN(limit) || limit < 0 || limit >= 21) limit = 20;

      const movieService = new MovieService();
      const movies = await movieService.findAll(page, limit, order, sort);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        movies,
      });
    } catch (err) {
      next(err);
    }
  }

  public async findRandomMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const movieService = new MovieService();
      const type = req.params.type;
      const featuredMovie = await movieService.findRandom(type);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        featuredMovie,
      });
    } catch (err) {
      next(err);
    }
  }

  public async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movieService = new MovieService();
      await createMovieSchema.validateAsync(req.body);

      const movie = await movieService.create(req.body);

      return res.status(200).json({
        success: true,
        statusCode: 201,
        movie,
      });
    } catch (err) {
      next(err);
    }
  }

  public async updateMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const movieService = new MovieService();
      await updateMovieSchema.validateAsync(req.body);

      const movie = await movieService.update(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        movie,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const movieService = new MovieService();
      await movieService.deleteById(req.params.id);

      return res.status(204).json({
        success: true,
        message: "Record deleted successfully!",
        statusCode: 204,
      });
    } catch (err) {
      next(err);
    }
  }
}
