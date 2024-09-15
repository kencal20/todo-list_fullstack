import { Request, Response } from "express"
import { TodoList } from "../../schemas/todoListSchema"

export async function createTodoController(req: Request, res: Response) {
    const { title, details, dueDate, status, priority, category } = req.body
    try {
        const todoItem = new TodoList({
            title,
            details,
            dueDate,
            status,
            priority,
            category
        })
        const createdTodoItem = await todoItem.save()
        res.json({ message: 'The to-do item has been created successfully', createdTodoItem })
    } catch (error:any) {
        res.status(500).json({ message: "Error creating the to-do item", error })
    }
}

