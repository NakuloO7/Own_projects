const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middlerware/authMiddleware');
const {z} = require('zod');const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createTodoSchema = z.object({
    title : z.string(),
    description : z.string(),
    completed : z.boolean().optional()
});

router.post('/create', authMiddleware, async(req, res) => {
    try {
        const parsedData = createTodoSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({message: "Invalid data"});
        }
        const {title, description, completed} = parsedData.data;
        
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                completed,
                userId : req.userId
            }
        });

        res.status(201).json({message: "Todo created successfully", todo});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});


router.get('/read', authMiddleware, async(req, res) => {
    try {
        const result = await prisma.todo.findMany({
            where : {
                userId : req.userId
            }
        });
        return res.status(200).json({message: "Todos fetched successfully", result});
    } catch (error) {
        return res.sendStatus(500).json({message: error.message});
    }
});


router.put('/update/:id', authMiddleware, async(req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;

        const parsedData = createTodoSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({message: "Invalid data"});
        }
        const todo = await prisma.todo.update({
            where : {
                id : parseInt(id),  //we will get the id from the url which is a string
                userId : req.userId
            },
            data : {
                title,
                description,
                completed
            }
        });
        return res.status(200).json({message: "Todo updated successfully", todo});
    } catch (error) {
        return res.sendStatus(500).json({message: error.message});
    }
});


router.get('/all', authMiddleware, async(req, res) => {
    try {
        const result = await prisma.todo.findMany({
            where : {
                userId : req.userId
            },
            select : {
                title : true,
                description : true,
                user : true
            }
        });
        return res.status(200).json({message: "Todos fetched successfully", result});
    } catch (error) {
        return res.sendStatus(500).json({message: error.message});
    }
})  

module.exports = router;