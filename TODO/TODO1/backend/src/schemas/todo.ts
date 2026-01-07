import {z} from 'zod';

export const createTodoSchema = z.object({
    title : z.string().min(1, "Title is required")
})

export const udpateTodoSchema = z.object({
    title : z.string().min(1, "Title is required").optional(),
    completed : z.boolean().optional()
})