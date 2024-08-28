const TodoList = require("../../schemas/todoListSchema");


async function getTodoListController(req, res) {
    try {
        const todoList = await TodoList.find();
        res.json({ message: "Here is the list of to-do items", todoList });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving to-do items", error });
    }
}

async function getTodoItemController(req, res) {
    const { id } = req.params;
    try {
        const todoItem = await TodoList.findById(id);
        if (!todoItem) {
            return res.status(404).json({ message: "To-do item not found" });
        }
        res.json({ message: "Here is the item you are searching for", todoItem });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the to-do item", error });
    }
}

module.exports = {
    getTodoListController,
    getTodoItemController,
};
