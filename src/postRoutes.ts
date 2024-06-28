import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/posts", async (_req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: "Posts not found" });
    console.error(err);
  }
});

router.post("/posts", async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ error: "Please provide a title, content, and userId" });
  }

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

router.put("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Please provide a title and content" });
  }
  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
});

export default router;
