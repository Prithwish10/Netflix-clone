import { Service } from "typedi";
import { ListDTO } from "../../dto/List.dto";
import { ListRepository } from "../../repositories/List.repository";
import { Api404Error } from "../../util/error-handler/Api404Error";

@Service()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  public async create(list: ListDTO) {
    try {
      const newList = await this.listRepository.createList(list);

      return newList;
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: string) {
    try {
      const isListPresent = await this.listRepository.findById(id);

      if (!isListPresent) {
        throw new Api404Error("List doesnot exist.");
      }
      await this.listRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }

  public async find(type: string, genre: string) {
    try {
      let list;

      if (type && genre) {
        list = await this.listRepository.findByTypeAndGenre(type, genre);
      } else if (type) {
        list = await this.listRepository.findByType(type);
      } else {
        // Else fetch random list
        list = this.listRepository.findRandom();
      }

      return list;
    } catch (err) {
      throw err;
    }
  }
}
