// Extend Express Request interface to include user
import { User } from "@supabase/supabase-js";
import { NextFunction, Request, Response } from "express";

import { supabase } from "../utils/supabaseClient.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeaders", authHeader);
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: Missing or invalid token",
      });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.log("error", error);
      return res.status(401).json({
        error: error?.message,
        message: "Unauthorized: Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
    });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized: User not authenticated",
      });
    }

    const userRole = req.user.user_metadata.role as string | undefined;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden: Insufficient permissions",
      });
    }

    next();
  };
};
