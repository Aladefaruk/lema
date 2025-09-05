import { connection } from "../connection";
import { selectPostsTemplate, deletePostTemplate, insertPostTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function(error) {
      if (error) {
        reject(error);
      }
      resolve(this.changes > 0);
    });
  });

export const createPost = (userId: string, title: string, body: string): Promise<Post> =>
  new Promise((resolve, reject) => {
    const id = Date.now().toString();
    const created_at = new Date().toISOString();
    
    connection.run(insertPostTemplate, [id, userId, title, body, created_at], function(error) {
      if (error) {
        reject(error);
      }
      resolve({ id, user_id: userId, title, body, created_at });
    });
  });
