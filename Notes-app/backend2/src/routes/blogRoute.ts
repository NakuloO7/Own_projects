import { Router, Request, Response } from "express";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";
import  jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authMiddleware } from "../middlewares/authMiddleware";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();
const router = Router();


const blogSchema = z.object({
    id : z.string().optional(),
    title : z.string(),
    content : z.string()
})

declare module 'express-serve-static-core'{
    interface Request{
        userId? : string
    }
}

router.post('/', authMiddleware, async(req : Request, res : Response) =>{
    try {
        const parsed = blogSchema.safeParse(req.body);
        if(!parsed.success){
            res.status(403).json({
                message : "Invalid Inputs"
            })
            return;
        }

        const { title , content} = parsed.data;

        const blog = await prisma.post.create({
            data : {
                title,
                content,
                authorId : req.userId!,
            }
        })

        res.json({
            id : blog.id,
            message : "Blog created successfully"
        })
    } catch (error) {
        res.status(411).json({
            message : "Internal Sever Error"
        })
    }
})



//updtate
router.put("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(401).json({
        message: "Invalid Inputs",
      });
      return;
    }

    const { id, title, content } = parsed.data;

    const post = await prisma.post.update({
      where: {
        id,
        authorId: req.userId!,
      },
      data: {
        title,
        content,
      },
    });

    res.json({
      message: "post updated successfully",
    });
    return;
  } catch (error) {
    res.status(401).json({
      message: "Internal server error",
    });
  }
});

//get all blogs
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findMany({
        select : {
            id : true,
            title : true,
            content : true,
            author : {
                select : {
                    name: true
                }
            }
        }
    })

    res.json({
        post
    })
  } catch (error) {
    res.status(401).json({
      message: "Internal server error",
    });
  }
});

//get specific blog by id
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const post = await prisma.post.findUnique({
      where: {
        id: id
      },
      select: {
        id : true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    if (!post) {
      res.status(404).json({
        message: "Post not found"
      });
      return;
    }

    res.json({
      post
    });
  } catch (error) {
    res.status(401).json({
      message: "Internal server error",
    });
  }
});


export default router;
