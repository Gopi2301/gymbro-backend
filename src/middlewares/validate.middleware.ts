import type { ZodType } from "zod";

import {  NextFunction, Request, Response } from "express";
import { ZodError  } from 'zod';

export const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed;
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          errors: err.issues,
          message: err.issues[0].message,
          status: "error"
        });
      }
      return res.status(500).json({
        message: "Internal server error",
        status: "error"
      })
    }
}