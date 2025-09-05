import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User, Address } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const result = connection.prepare(selectCountOfUsersTemplate).get() as { count: number };
      resolve(result.count);
    } catch (error) {
      reject(error);
    }
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    try {
      const results = connection.prepare(selectUsersTemplate).all(pageNumber * pageSize, pageSize) as any[];
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
    } catch (error) {
      reject(error);
    }
  });
