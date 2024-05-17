import { NextFunction, Request, Response, Router } from "express";

import { PerkService } from "../services/perk.service";

export class PerkController {
  public router = Router();
  constructor(private service: PerkService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll).post(this.add);

    this.router.route("/:id").get(this.find).delete(this.delete).put(this.update);
  }

  public findAll = async (_: Request, res: Response, next: NextFunction) => {
    const result = await this.service.findAll();
    res.send(result);
  };

  public add = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.add(req.body);
    res.send(result);
  };

  public find = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.find(req.params.id);
    res.send(result);
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.delete(req.params.id);
    res.send(result);
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.update(
      req.params.id,
      req.body
    );
    res.send(result);
  };
}
