import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { ItemController } from "./controllers/item.controller";
import { ItemService } from "./services/item.service";
import { PerkController } from "./controllers/perk.controller";
import { PerkService } from "./services/perk.service";
import { InventoryController } from "./controllers/inventory.controller";
import { InventoryService } from "./services/inventory.service";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { handleErrors } from "./middleware/error-handler.middleware";
import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

export const MONGO = {
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/game7',
  configuration: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
  }
}

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
    this.setErrorHandlingMiddleware();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO.url, MONGO.configuration);
  }

  private setControllers() {
    const userController = new UserController(new UserService());
    this.app.use("/api/users", userController.router);

    const itemController = new ItemController(new ItemService());
    this.app.use("/api/items", itemController.router);

    const perkController = new PerkController(new PerkService());
    this.app.use("/api/perks", perkController.router);

    const inventoryController = new InventoryController(new InventoryService());
    this.app.use("/api/inventory", inventoryController.router);
  }

  private setErrorHandlingMiddleware() {
    this.app.use(handleErrors);
  }
}

export default new App().app;
