import { connection } from "../connection";
import { selectPostsTemplate, deletePostTemplate, insertPostTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = async (userId: string): Promise<Post[]> => {
  try {
    const results = await connection.all(selectPostsTemplate, [userId]) as Post[];
    return results;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    const result = await connection.run(deletePostTemplate, [postId]) as any;
    return result.changes > 0;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (userId: string, title: string, body: string): Promise<Post> => {
  try {
    const id = Date.now().toString();
    const created_at = new Date().toISOString();
    
    await connection.run(insertPostTemplate, [id, userId, title, body, created_at]);
    return { id, user_id: userId, title, body, created_at };
  } catch (error) {
    throw error;
  }
};
