import mongoose, { ConnectOptions } from "mongoose";
import { Db } from "mongodb";
import config from "../config/index";

export default async (): Promise<Db> => {
  const mongoURL = config.connections.mongodb.databaseURL;
  if(!mongoURL) {
    throw new Error('Could not find database URL');
  }

  const connection = await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  return connection.connection.db;
};
