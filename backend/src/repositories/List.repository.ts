import Logger from "../loaders/logger";
import { ListDTO } from "../dto/List.dto";
import { Api500Error } from "../util/error-handler/Api500Error";
import List from "../models/List.model";

export class ListRepository {
  public async createList(list: ListDTO) {
    try {
      const newList = await List.create(list);
      return newList;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while creating list: ${err}`);
        throw new Api500Error(err.message);
      }
    }
  }

  public async deleteById(id: string) {
    try {
      await List.findByIdAndDelete(id);
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while creating list: ${err}`);
        throw new Api500Error(err.message);
      }
    }
  }

  public async findById(id: string) {
    try {
      const list = await List.findById(id);
      return list;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while creating list: ${err}`);
        throw new Api500Error(err.message);
      }
    }
  }

  // Find random lists of given size
  public async findRandom(size: number = 10) {
    try {
      const list = await List.aggregate([
        {
          $sample: { size: size },
        },
      ]);

      return list;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while creating list: ${err}`);
        throw new Api500Error(err.message);
      }
    }
  }

  public async findByType(type: string, size: number = 10) {
    try {
      const list = await List.aggregate([
        {
          $sample: { size: size },
        },
        {
          $match: { type: type },
        },
      ]);

      return list;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while creating list: ${err}`);
        throw new Api500Error(err.message);
      }
    }
  }

  public async findByTypeAndGenre(
    type: string,
    genre: string,
    size: number = 10
  ) {
    try {
      const list = await List.aggregate([
        {
          $sample: { size: size },
        },
        {
          $match: { type: type, genre: genre },
        },
      ]);

      return list;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while creating list: ${err}`);
        throw new Api500Error(err.message);
      }
    }
  }
}
