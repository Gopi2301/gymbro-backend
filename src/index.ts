// index.js
import { apiRouter } from "#routes/index.js";
import cors from "cors";
import express, { Request, Response } from "express";
import logger from "#utils/logger.js";
import loggerMiddleware from "#middlewares/logger.middleware.js";
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from '#utils/swagger.js';

const app = express();

const port = process.env.PORT ?? "5000";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api/v1", apiRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
