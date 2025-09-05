import { connection } from "../connection";
import { selectPostsTemplate, deletePostTemplate, insertPostTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    try {
      const results = connection.prepare(selectPostsTemplate).all(userId) as Post[];
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });

export const deletePost = (postId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    try {
      const result = connection.prepare(deletePostTemplate).run(postId);
      resolve(result.changes > 0);
    } catch (error) {
      reject(error);
    }
  });

export const createPost = (userId: string, title: string, body: string): Promise<Post> =>
  new Promise((resolve, reject) => {
    try {
      const id = Date.now().toString();
      const created_at = new Date().toISOString();
      
      connection.prepare(insertPostTemplate).run(id, userId, title, body, created_at);
      resolve({ id, user_id: userId, title, body, created_at });
    } catch (error) {
      reject(error);
    }
  });
