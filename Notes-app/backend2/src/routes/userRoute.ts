import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(4),
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(403).json({
        message: "Invalid user inputs",
      });
      return;
    }

    const { name, email, password } = parsed.data;
    const user = await prisma.user.create({
      data: {
        name: name || "",
        email,
        password,
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.json({
      token,
    });
  } catch (error) {
    res.status(401).json({ 
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(403).json({
        message: "Invalid user inputs",
      });
      return;
    }

      const { email, password } = parsed.data;
      const user = await prisma.user.findUnique({
        where : {
            email,
            password
        }
      })

      if(!user){
        res.status(403).json({
            message : "User not found"
        })
        return;
      }

      const token = jwt.sign({id : user.id}, JWT_SECRET);
      res.json({
        token
      })

  } catch (error) {
    res.status(401).json({
      message: "Internal server error",
    });
  }
});

export default router;
