import config from "./config";
import express from "express";
import Logger from "./loaders/logger";
import mongooseLoader from "./loaders/mongoose";
import { Api500Error } from "./util/error-handler/Api500Error";

async function startServer() {
  const app = express();

  try {
    await require("./loaders/Express").default({ app });

    app
      .listen(config.port, () => {
        Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
      })
      .on("error", (err) => {
        Logger.error(err);
        process.exit(1);
      });

    const mongoConnection = await mongooseLoader();
    Logger.info(`
      ################################################
      🛡️  Db connected successfully !! 🛡️
      ################################################
    `);
  } catch (err) {
    if(err instanceof Error)
      throw new Api500Error(err.message);
  }
}

startServer();
