import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User, Address } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results: any[]) => {
        if (error) {
          reject(error);
        }
        const users = results.map(row => {
          const user: User = {
            id: row.id,
            name: row.name,
            username: row.username,
            email: row.email,
            phone: row.phone
          };
          if (row.address_id) {
            user.address = {
              id: row.address_id,
              user_id: row.id,
              street: row.street,
              state: row.state,
              city: row.city,
              zipcode: row.zipcode
            };
          }
          return user;
        });
        resolve(users);
      }
    );
  });
