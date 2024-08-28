const mongoose=require('mongoose')

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ['pending', 'completed', 'cancelled']
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high']
    },
    category: {
        type: String,
        required: true,
        enum: ['work', 'personal', 'shopping', 'health']
    }
}, {
    timestamps: true
})

const TodoList = mongoose.model('TodoList', todoListSchema)

module.exports=TodoList;