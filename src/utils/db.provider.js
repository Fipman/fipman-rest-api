import { MongoClient } from 'mongodb';
import config from '../config';

const connectionString = config.mongodb_connection;
const dbName = config.mongodb_db;
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

