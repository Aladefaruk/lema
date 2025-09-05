/** @format */

import Database from "better-sqlite3";
import config from "config";

const dbPath = config.get("dbPath") as string;
export const connection = new Database(dbPath);
