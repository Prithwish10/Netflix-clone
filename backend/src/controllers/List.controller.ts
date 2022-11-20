import { Request, Response, NextFunction } from "express";
import { ListService } from "../services/list/List.service";
import { createListSchema } from "../services/list/list.validation.schema";

export class ListController {
  public async createList(req: Request, res: Response, next: NextFunction) {
    try {
      const listService = new ListService();
      await createListSchema.validateAsync(req.body);
      const list = await listService.create(req.body);

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
      const listService = new ListService();
      const list = await listService.find(
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
      const listService = new ListService();
      await listService.delete(req.params.id);

      return res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}
