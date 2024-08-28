const TodoList = require('../../schemas/todoListSchema')

 async function createTodoController(req, res) {
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
    } catch (error) {
        res.status(500).json({ message: "Error creating the to-do item", error })
    }
}

module.exports=createTodoController;
