/** @format */

import * as sqlite3 from "sqlite3";
import * as config from "config";
import { promisify } from "util";

const dbPath = config.get("dbPath") as string;
const db = new sqlite3.Database(dbPath);

export const connection = {
  all: promisify(db.all.bind(db)),
  run: promisify(db.run.bind(db)),
  get: promisify(db.get.bind(db))
};
