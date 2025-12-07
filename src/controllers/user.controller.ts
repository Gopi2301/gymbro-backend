import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.id !== id) {
    return res.status(403).json({ message: "Forbidden: You can only access your own profile" });
  }

  try {
    // Fetch user details from Drizzle using email (since IDs don't match)
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
