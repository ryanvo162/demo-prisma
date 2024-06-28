import express from "express";
import userRoutes from "./userRoutes";
import postsRoutes from "./postRoutes";

const app = express();
const PORT = 1060;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "This is the root route" });
});

app.use(userRoutes);
app.use(postsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
