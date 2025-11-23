import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from 'zod';

export const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed;
      return next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: err.issues,
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      })
    }
}