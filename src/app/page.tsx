import { getTodos } from "@/lib/actions";
import TodoList from "@/components/todo-list";
import AddTodoForm from "@/components/add-todo-form";

export default async function Home() {
  // Fetch todos using server action
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>
        <AddTodoForm />
        <TodoList initialTodos={todos} />
      </div>
    </main>
  );
}
