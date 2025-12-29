import { Router, Request, Response } from "express";
import { prisma } from "../db/client";
import authMiddleware from "../middleware/auth.middleware";
import { REPLCommand } from "node:repl";
const router = Router();
router.use(authMiddleware)

declare module 'express-serve-static-core'{
    interface Request{
        userId? : string
    }
}

//create 
router.post('/', async(req : Request, res : Response)=>{
    const {title} = req.body;
    const userId = req.userId || "";

    try {
        const todo = await prisma.todo.create({
            data : {
                title,
                userId
            }
        })

        res.status(200).json({
            message : "todo added!",
            todo
        })
        
    } catch (error) {
        console.log("Error in the post todo route!");
        res.status(401).json({
            ERROR : "Error in the post todo route!"
        })
    }
})
//read

router.get('/', async(req : Request, res : Response)=>{
    const userId = req.userId || "";
    try {
        const todos = await prisma.todo.findMany({
            where : {
                userId
            }
        })

        res.status(200).json({
            todos
        })
    } catch (error) {
        console.log("Error in the get todo route!");
        res.status(401).json({
            ERROR : "Error in the get todo route!"
        })
    }
})
//update
router.put('/:id', async(req : Request, res : Response)=>{
    const todoId= req.params.id || "";
    const {title, completed} = req.body;
    try{
        
        const updateTodo = await prisma.todo.update({
            where  : {
                id : todoId
            }, data : {
                title,
                completed
            }
        })

        res.status(200).json({
            message : "Todo updated!",
            updateTodo
        })


    }catch (error) {
        console.log("Error in the update todo route!");
        res.status(401).json({
            ERROR : "Error in the update todo route!"
        })
    }
})
//delete

router.delete('/:id', async(req : Request, res : Response)=>{
    const todoId = req.params.id || "";
    try{
        await prisma.todo.delete({
            where : {
                id : todoId
            }
        })

    }catch (error) {
        console.log("Error in the update todo route!");
        res.status(401).json({
            ERROR : "Error in the update todo route!"
        })
    }
})

export default router;