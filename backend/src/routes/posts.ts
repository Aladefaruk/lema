import { Router, Request, Response } from "express";
import { getPosts, deletePost, createPost } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  try {
    const posts = await getPosts(userId);
    res.send(posts);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch posts" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, title, body } = req.body;
  
  if (!userId || !title || !body) {
    res.status(400).send({ error: "userId, title, and body are required" });
    return;
  }
  
  try {
    const post = await createPost(userId, title, body);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    res.status(400).send({ error: "Post ID is required" });
    return;
  }
  
  try {
    const deleted = await deletePost(id);
    if (deleted) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete post" });
  }
});

export default router;
