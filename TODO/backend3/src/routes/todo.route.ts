import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { prisma } from "../db/client";
const router = Router();

router.use(authMiddleware);
declare module 'express-serve-static-core'{
    interface Request{
        userId? : string
    }
}

//create 
router.post('/', async(req : Request, res :  Response)=>{
    const {title} = req.body;
    const userId = req.userId!;

    try {
        const todo = await prisma.todo.create({
            data : {
                title, 
                userId
            }
        })
        
        res.status(200).json({
            message : "Todo added!",
            todo
        })
    } catch (error) {
        console.log("Error from todo Route", error)
        res.status(400).json({
            Error: "Error from todo Route"
        })
    }
})



//read

router.get('/', async(req : Request, res : Response)=>{
    const userId = req.userId!;

    const todos= await prisma.todo.findMany({
        where : {
            userId
        }
    })

    res.status(200).json({
        todos
    })

})
//update

router.put('/:id', async(req : Request, res :Response)=>{
    const {title, completed} = req.body;
    const todoId = req.params.id!;

    const todo = await prisma.todo.update({
        where : {
            id : todoId
        }, data : {
            title,
            completed
        }
    })

    res.status(200).json({
        message :"todo updated",
        todo
    })
})


//delete
router.put('/:id', async(req : Request, res :Response)=>{
    const todoId = req.params.id!;
    await prisma.todo.delete({
        where: {
            id : todoId
        }
    })
})

export default router;