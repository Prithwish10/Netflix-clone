import { ListDTO } from "../../dto/List.dto";
import { ListRepository } from "../../repositories/List.repository";
import { Api404Error } from "../../util/error-handler/Api404Error";

export class ListService {
  public async create(list: ListDTO) {
    try {
      const listRepository = new ListRepository();
      const newList = await listRepository.createList(list);

      return newList;
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: string) {
    try {
      const listRepository = new ListRepository();
      const isListPresent = await listRepository.findById(id);

      if (!isListPresent) {
        throw new Api404Error("List doesnot exist.");
      }
      await listRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }

  public async find(type: string, genre: string) {
    try {
      const listRepository = new ListRepository();
      let list;

      if (type && genre) {
        list = await listRepository.findByTypeAndGenre(type, genre);
      } else if (type) {
        list = await listRepository.findByType(type);
      } else {
        // Else fetch random list
        list = listRepository.findRandom();
      }

      return list;
    } catch (err) {
      throw err;
    }
  }
}
