import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { componentProps } from "./objects.models";
import axios from "axios";
import InputComponent from "./inputComponents";


type Props = {
    todos: componentProps["formProps"][];
    setTodos: React.Dispatch<React.SetStateAction<componentProps["formProps"][]>>;
};

export default function CreateTodo({ setTodos }: Props) {
    const [input, setInput] = useState<componentProps['formProps']>({
        title: "",
        details: "",
        dueDate: "",
        status: "pending",
        priority: "medium",
        category: "work",
    });
    const navigate = useNavigate();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { title, details, dueDate, status, priority, category } = input;
        if (!title || !details || !dueDate || !status || !priority || !category) {
            alert('All fields are required')
            return
        }
        try {
            await axios.post("http://localhost:3000/todolist/createtodo", input);
            const newTodo: componentProps["formProps"] = {
                title,
                details,
                dueDate,
                status,
                priority,
                category,
            };
            setTodos((prev) => [...prev, newTodo]);
            navigate("/");
        } catch (error) {
            console.error("Error creating to-do item:", error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-600">
            <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-md ">
                <h2 className="text-2xl font-bold mb-6 text-center">Create To-Do</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputComponent
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={input.title}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                    <textarea
                        placeholder="Details"
                        name="details"
                        value={input.details}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md max-h-full"
                    />
                    <InputComponent
                        label='Due Date'
                        placeholder="Due Date"
                        name="dueDate"
                        value={input.dueDate}
                        onChange={handleInputChange}
                        type="date"
                    />
                    <InputComponent
                        label="Status"
                        placeholder="Status"
                        name="status"
                        onChange={handleInputChange}
                        value={input.status}
                        className="w-full p-2 border rounded-md"
                        type="select"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </InputComponent>

                    <InputComponent
                        label="Priority"
                        name="priority"
                        value={input.priority}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        type="select"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </InputComponent>

                    <InputComponent
                        label="Category"
                        name="category"
                        value={input.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        type="select"
                    >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="shopping">Shopping</option>
                        <option value="health">Health</option>
                    </InputComponent>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
