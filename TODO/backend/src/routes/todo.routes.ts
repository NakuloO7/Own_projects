import { Router } from "express";
import {prisma} from '../db//client'
import { authMiddleware } from "../middlewares/auth.middlerware";
const router = Router();

router.use(authMiddleware)

//create
router.post('/', async(req , res)=>{
    const {title} = req.body;
    const userId = req.userId; //this will come from the middleware 

    if(!userId){
        return res.status(400).json({
            message : "Unauthorized user"
        })
    }
    const todo = await prisma.todo.create({
        data : {
            title,
            userId
        }
    })

    res.json({
        todo
    })
});

//read
router.get('/', async(req , res)=>{
    const userId  = req.userId;
    if(!userId){
        return res.status(400).json({
            message : "Unauthorized user"
        })
    }
    const todos = await prisma.todo.findMany({
        where : {
            userId
        }
    });

    res.json({
        todos
    })
});

//update 
router.put('/:id', async(req, res)=>{
    const todo = await prisma.todo.update({
        where : {
            id : req.params.id
        },
        data : {
            title : req.body.title,
            completed : req.body.completed
        }
    })
});

//delete 
router.delete('/:id', async(req , res)=>{
    await prisma.todo.delete({
        where : {id : req.params.id}
    })

    res.json({
        message : "Todo deleted!"
    })
})






export default router;