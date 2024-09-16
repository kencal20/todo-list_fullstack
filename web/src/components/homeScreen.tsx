import { useNavigate } from "react-router-dom";
import { componentProps } from "./objects.models";
import axios from "axios";
import CardComponent from "./cardComponent";

type Props = {
    todos: componentProps['formProps'][];
    setTodos: React.Dispatch<React.SetStateAction<componentProps['formProps'][]>>;
    fetchTodos: () => void;
};

export default function HomeScreen({ todos, setTodos, fetchTodos }: Props) {
    const navigate = useNavigate();

    async function handleDelete(id: string) {
        try {
            await axios.delete(`http://localhost:3000/todolist/todo/${id}`);
            setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
            fetchTodos();
        } catch (error) {
            console.error("Error deleting to-do item:", error);
            alert("Failed to delete the to-do item. Please try again.");
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
            <button
                onClick={() => navigate("/createtodo")}
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Create To-Do
            </button>

            <button
                onClick={() => navigate("/dashboard")}
                className="mb-4 ml-5 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 font-bold"
            >
                Dashboard
            </button>

            <ul className="space-y-4">
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <CardComponent 
                            title={todo.title} 
                            backgroundColor="bg-white" 
                            textColor="text-gray-800"
                        >
                            <>
                                <p>{todo.details}</p>
                                <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${todo.priority === 'high' ? 'bg-red-500 text-white' : todo.priority === 'medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                    </span>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => todo._id && handleDelete(todo._id)}
                                            className="ml-auto bg-red-700 text-white p-2 rounded hover:bg-red-800 text-lg "
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => navigate(`/edittodo/${todo._id}`)}
                                            className="ml-auto bg-blue-700 text-white p-2 rounded hover:bg-blue-800 text-lg"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </>
                        </CardComponent>
                    </li>
                ))}
            </ul>
        </div>
    );
}
