import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { createTodoSchema, udpateTodoSchema } from "../schemas/todo";
import { prisma } from "../prisma";

const router = Router();
router.use(authMiddleware);

//create
router.post('/', async(req : AuthRequest, res )=>{
    const parsed = createTodoSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(401).json({
            message : "Invalid Inputs!"
        })
    }

    const title = parsed.data.title;
    const todo = await prisma.todo.create({
        data : {
            title,
            userId : req.userId!
        }
    })

    res.status(201).json({
        todo
    })
})


//read
router.get('/', async(req : AuthRequest, res)=>{
    const todos = await prisma.todo.findMany({
        where : {
            userId : req.userId!
        },
        orderBy: { createdAt: "desc" },
    })

    res.status(201).json({
        todos
    })
})


//update

router.put('/:id', async(req : AuthRequest, res)=>{
    const parsed = udpateTodoSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(401).json({
            message : "Invalid Inputs!"
        })
    }
    const id = req.params.id;
    const userId = req.userId!;
    if(!id || !userId){
        return res.status(400).json({
            message : "Invalid Request"
        })
    }

    const {title, completed} = parsed.data;
    const upadatedData : Record<string, any> = {};
    if(parsed.data.title !== undefined){
        upadatedData.title = parsed.data.title;
    }
    if(parsed.data.completed !== undefined){
        upadatedData.completed = parsed.data.completed;
    }
    
    const todo = await prisma.todo.update({
        where : {
            id, 
            userId
        }, data : {
            title : upadatedData.title,
            completed : upadatedData.completed
        }
    })
    res.json({
        message : "Updated!"
    })
})

//delete
router.delete('/:id', async(req : AuthRequest, res)=>{
    const id = req.params.id;
    const userId  = req.userId;
    if(!id || !userId){
        return res.status(401).json({
            message : "Invalid Request!"
        })
    }

    await prisma.todo.deleteMany({
        where: {
            id,
            userId
        }
    })
    res.json({
        message : "Deleted!"
    })
})


export default router;