const express = require('express')
const TodoList = require('../../schemas/todoListSchema')
const router = express.Router()

async function deletetodoItemController(req, res) {
    const { id } = req.params;
    try {
        const deletedTodoItem = await TodoList.findByIdAndDelete(id);
        if (!deletedTodoItem) {
            return res.status(404).json({ message: 'Item cannot be found' });
        }
        res.json({ message: 'Item has been deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the to-do item", error });
    }
}

module.exports = deletetodoItemController;

