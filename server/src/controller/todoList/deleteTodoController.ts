import { Request, Response } from "express";
import { TodoList } from "../../schemas/todoListSchema";

export async function deletetodoItemController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const deletedTodoItem = await TodoList.findByIdAndDelete(id);
        if (!deletedTodoItem) {
            return res.status(404).json({ message: 'Item cannot be found' });
        }
        res.json({ message: 'Item has been deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: "Error deleting the to-do item", error });
    }
}


