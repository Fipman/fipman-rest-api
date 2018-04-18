import { MongoClient } from 'mongodb';
import config from '../config';

const connectionString = process.env.MONGO_CONNECTION || config.mongodb_connection;
const dbName = process.env.MONGO_DATABASE || config.mongodb_db;
let db = null;

const init = () => {
  MongoClient.connect(connectionString, (err, client) => {
    if (err) {
      throw Error(err);
    }
    db = client.db(dbName);
  });
};

export {
  init,
  db,
};

