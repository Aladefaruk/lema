import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User, Address } from "./types";

export const getUsersCount = async (): Promise<number> => {
  try {
    const result = await connection.get(selectCountOfUsersTemplate) as { count: number };
    return result.count;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (
  pageNumber: number,
  pageSize: number
): Promise<User[]> => {
  try {
    const results = await connection.all(selectUsersTemplate, [pageNumber * pageSize, pageSize]) as any[];
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
    return users;
  } catch (error) {
    throw error;
  }
};
