import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateUser, registerUser } from "../services/userService";
import { IUser } from "../modules/userMoudle";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = req.body;
    if (!user.name || !user.password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }
    const newUser = await registerUser(user);
    res.status(201).json({user: newUser})
  } catch (error) {
    res.status(409).json({ error: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }
    const user: IUser | null = await authenticateUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user._id, organization:user.organization }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
        sameSite: "strict",
      });
      res.json({ token, user });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    if (error === "Invalid username or password." || "user not found") {
        res.status(401).json({ error: error });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
  }
};
