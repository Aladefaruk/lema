import * as sqlite3 from "sqlite3";
import config from "config";

const dbPath = config.get("dbPath") as string;
const db = new sqlite3.Database(dbPath);

export const connection = {
  all: (sql: string, params?: any[]): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      db.all(sql, params || [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  run: (sql: string, params?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.run(sql, params || [], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes, lastID: this.lastID });
      });
    });
  },
  get: (sql: string, params?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.get(sql, params || [], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};
