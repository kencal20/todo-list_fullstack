import { useState } from "react";
import CardComponent from "./cardComponent";
import { componentProps } from "./objects.models";

type Props = {
    todos: componentProps['formProps'][];
    fetchTodos: () => void;
};

export default function Dashboard({ todos, fetchTodos }: Props) {
    const [filter, setFilter] = useState<string | null>(null);

    const totalTodos = todos.length;

    const priorityCounts = todos.reduce(
        (acc, todo) => {
            acc[todo.priority] = (acc[todo.priority] || 0) + 1;
            return acc;
        },
        { high: 0, medium: 0, low: 0 } as Record<string, number>
    );

    const statusCounts = todos.reduce(
        (acc, todo) => {
            acc[todo.status] = (acc[todo.status] || 0) + 1;
            return acc;
        },
        { completed: 0, pending: 0, deleted: 0 } as Record<string, number>
    );

    const filteredTodos = filter
        ? todos.filter((todo) => todo.priority === filter || todo.status === filter)
        : todos;

    async function getTodos() {
        await fetchTodos();
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardComponent 
                    title="Total Todos"
                    value={totalTodos}
                    backgroundColor="bg-white"
                    textColor="text-gray-800"
                    onClick={() => setFilter(null)}
                />
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Filter by Priority</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <CardComponent 
                        title="High Priority"
                        value={priorityCounts.high}
                        backgroundColor="bg-red-100"
                        textColor="text-red-800"
                        onClick={() => setFilter('high')}
                    />
                    <CardComponent 
                        title="Medium Priority"
                        value={priorityCounts.medium}
                        backgroundColor="bg-yellow-100"
                        textColor="text-yellow-800"
                        onClick={() => setFilter('medium')}
                    />
                    <CardComponent 
                        title="Low Priority"
                        value={priorityCounts.low}
                        backgroundColor="bg-green-100"
                        textColor="text-green-800"
                        onClick={() => setFilter('low')}
                    />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-700">Filter by Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardComponent 
                        title="Completed"
                        value={statusCounts.completed}
                        backgroundColor="bg-blue-100"
                        textColor="text-blue-800"
                        onClick={() => setFilter('completed')}
                    />
                    <CardComponent 
                        title="Pending"
                        value={statusCounts.pending}
                        backgroundColor="bg-orange-100"
                        textColor="text-orange-800"
                        onClick={() => setFilter('pending')}
                    />
                    <CardComponent 
                        title="Deleted"
                        value={statusCounts.deleted}
                        backgroundColor="bg-gray-200"
                        textColor="text-gray-800"
                        onClick={() => setFilter('deleted')}
                    />
                </div>
            </div>

            <button onClick={getTodos} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Refresh Todos
            </button>

            <ul className="space-y-4 mt-6">
                {filteredTodos.map((todo) => (
                    <li key={todo._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-gray-800">{todo.title}</h3>
                        <p className="text-gray-700">{todo.details}</p>
                        <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
