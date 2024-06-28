import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/users", async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ error: "Please provide an email and a name" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Please provide a unique email" });
    console.log(err);
  }
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User not found" });
    console.log(err);
  }
});

router.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name } = req.body;
  if (!email || !name) {
    return res
      .status(400)
      .json({ error: "Please provide an email and a name" });
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User not found" });
    console.log(err);
  }
});

export default router;
