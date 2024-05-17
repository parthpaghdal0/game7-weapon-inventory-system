import { NextFunction, Request, Response, Router } from "express";

import { InventoryService } from "../services/inventory.service";

export class InventoryController {
  public router = Router();
  constructor(private service: InventoryService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/discard").post(this.discard);
    this.router.route("/equip").post(this.equip);
    this.router.route("/transfer").post(this.transfer);
  }

  public discard = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.discard(req.body.userId, req.body.itemId);
    res.send(result);
  };

  public equip = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.equip(req.body.userId, req.body.itemId);
    res.send(result);
  };

  public transfer = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.service.transfer(req.body.senderId, req.body.receiverId, req.body.itemId, req.body.quantity);
    res.send(result);
  };
}
