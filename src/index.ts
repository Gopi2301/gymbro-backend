// index.js
import { apiRouter } from "#routes/index.js";
import cors from "cors";
import express, { Request, Response } from "express";
const app = express();

const port = process.env.PORT ?? "5000";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
