import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { ListService } from "../services/list/List.service";
import { createListSchema } from "../services/list/list.validation.schema";

@Service()
export class ListController {
  constructor(private readonly listService: ListService) {}

  public async createList(req: Request, res: Response, next: NextFunction) {
    try {
      await createListSchema.validateAsync(req.body);
      const list = await this.listService.create(req.body);

      return res.status(201).json({
        success: true,
        statusCode: 200,
        list,
      });
    } catch (err) {
      next(err);
    }
  }

  public async findList(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.listService.find(
        req.query.type as string,
        req.query.genre as string
      );

      return res.status(200).json({
        success: true,
        statusCode: 200,
        list,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteList(req: Request, res: Response, next: NextFunction) {
    try {
      await this.listService.delete(req.params.id);

      return res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}
