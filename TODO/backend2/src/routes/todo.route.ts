import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { prisma } from "../db/client";
const router = Router();

router.use(authMiddleware);  //this is authenticate all the routes coming at /api/auth/

declare module 'express-serve-static-core'{
    interface Request{
        userId? : string
    }
}

//create
router.post('/', async(req : Request, res : Response)=>{
    const {title} = req.body;
    const userId = req.userId;

    if(!userId){
        return res.status(400).json({
            message : "Unathorized User!"
        })
    }

    const todo = await prisma.todo.create({
        data : {
            title,
            userId
        }
    })

    res.status(200).json({
        todo
    })
})




//read
router.get('/', async(req : Request, res : Response)=>{
    const userId = req.userId;

    if(!userId){
        return res.status(400).json({
            message : "Unathorized User!"
        })
    }

    const todos = await prisma.todo.findMany({
        where : {
            userId
        }
    })

    res.status(200).json({
        todos
    })
})


//update
router.put('/:id', async(req : Request, res : Response)=>{
    const todoID = req.params.id;
    if(!todoID){
        return res.status(400).json({
            message : "Select the todo to update!"
        })
    }
    const {title, completed}= req.body;

    const updatedTodo= await prisma.todo.update({
        where : {
            id : todoID
        }, 
        data : {
            title,
            completed
        }
    })

    res.status(200).json({
        updatedTodo
    })
})
//delete
router.delete('/:id', async(req : Request, res : Response)=>{
    const todoID =req.params.id;
    if(!todoID){
        return res.status(400).json({
            message : "Select the todo to update!"
        })
    }

    await prisma.todo.delete({
        where : {
            id : todoID
        }
    })

    res.status(200).json({
        message : "Todo removed!"
    })
})


export default router;