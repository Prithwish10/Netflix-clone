import { Service } from "typedi";
import { IMovie, UpdateMoviePayloadDTO } from "../../dto/Movie.dto";
import { MovieRepository } from "../../repositories/Movie.repository";
import { Api404Error } from "../../util/error-handler/Api404Error";
import { Api500Error } from "../../util/error-handler/Api500Error";

@Service()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async findAll(
    page: number,
    limit: number,
    order: number,
    sort: string
  ) {
    try {
      // const movieRepository = new MovieRepository();
      const movies = await this.movieRepository.findAll(page, limit, order, sort);
      return movies;
    } catch (err) {
      throw err;
    }
  }

  public async findRandom(type: string) {
    try {
      // const movieRepository = new MovieRepository();
      const isSeries = type && type === "series" ? true : false;
      const randomMovieOrSeries = await this.movieRepository.findRandomMovieOrSeries(
        isSeries
      );

      return randomMovieOrSeries;
    } catch (err) {
      throw err;
    }
  }

  public async findById(id: string) {
    try {
      // const movieRepository = new MovieRepository();
      const movie = await this.movieRepository.findById(id);
      return movie;
    } catch (err) {
      throw err;
    }
  }

  public async create(movie: IMovie) {
    try {
      // const movieRepository = new MovieRepository();
      const newMovie = await this.movieRepository.create(movie);
      return newMovie;
    } catch (err) {
      throw err;
    }
  }

  public async update(id: string, movie: UpdateMoviePayloadDTO) {
    try {
      // const movieRepository = new MovieRepository();
      const isMoviePresent = await this.movieRepository.findById(id);

      if (!isMoviePresent) {
        throw new Api404Error("Movie doesnot exist.");
      }
      // Appending the movie_id in the movie payload
      movie.id = id;
      const updatedMovie = await this.movieRepository.updateById(movie);
      return updatedMovie;
    } catch (err) {
      throw err;
    }
  }

  public async deleteById(id: string) {
    try {
      // const movieRepository = new MovieRepository();
      await this.movieRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}
