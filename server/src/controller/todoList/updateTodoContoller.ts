import { Request, Response } from "express";
import { TodoList } from "../../schemas/todoListSchema";

export async function updateTodoController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const { title, details, dueDate, status, priority, category } = req.body;
        const updatedUser = await TodoList.findByIdAndUpdate(
            id,
            { title, details, dueDate, status, priority, category },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Item cannot be found' });
        }
        res.json({ message: "The to-do item has been updated successfully", updatedUser });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateTodoController