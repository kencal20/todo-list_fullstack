import { Request, Response } from "express";
import { TodoList } from "../../schemas/todoListSchema";

export async function getTodoListController(req:Request, res:Response) {
    try {
        const todoList = await TodoList.find();
        res.json({ message: "Here is the list of to-do items", todoList });
    } catch (error:any) {
        res.status(500).json({ message: "Error retrieving to-do items", error });
    }
}

export async function getTodoItemController(req:Request, res:Response) {
    const { id } = req.params;
    try {
        const todoItem = await TodoList.findById(id);
        if (!todoItem) {
            return res.status(404).json({ message: "To-do item not found" });
        }
        res.json({ message: "Here is the item you are searching for", todoItem });
    } catch (error:any) {
        res.status(500).json({ message: "Error retrieving the to-do item", error });
    }
}


