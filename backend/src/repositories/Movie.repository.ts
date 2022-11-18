import { IMovie, UpdateMoviePayloadDTO } from "../dto/Movie.dto";
import Movie from "../models/Movie.model";
import Logger from "../loaders/logger";
import { Api500Error } from "../util/error-handler/Api500Error";

export class MovieRepository {
  public async findAll(
    page: number,
    limit: number,
    order: number,
    sort: string
  ) {
    try {
      const movies = await Movie.find()
        .sort({ [sort]: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return movies;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api500Error(
          `Error occured while finding movies: ${err.message}`
        );
      }
    }
  }

  public async findRandomMovieOrSeries(isSeries: boolean) {
    try {
      let movieOrSeries;

      if (isSeries) {
        movieOrSeries = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movieOrSeries = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }

      Logger.debug("Random movie or series %o",movieOrSeries);

      return movieOrSeries;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api500Error(
          `Error occured while finding movies: ${err.message}`
        );
      }
    }
  }

  public async findById(id: string) {
    try {
      const movie = await Movie.findById(id);
      return movie;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api500Error(
          `Error occured while finding movie by Id: ${err.message}`
        );
      }
    }
  }

  public async create(movie: IMovie) {
    try {
      const newMovie = await Movie.create(movie);
      return newMovie;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api500Error(
          `Error occured while creating movie: ${err.message}`
        );
      }
    }
  }

  public async updateById(movie: UpdateMoviePayloadDTO) {
    try {
      const { id, ...restMovieInfo } = movie;

      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        {
          $set: restMovieInfo,
        },
        { new: true }
      );

      return updatedMovie;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while updating movie: ${err.message}`);
        throw new Api500Error(err.message);
      }
    }
  }

  public async deleteById(id: string) {
    try {
      await Movie.findByIdAndDelete(id);
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while deleting movie: ${err.message}`);
        throw new Api500Error(err.message);
      }
    }
  }
}
