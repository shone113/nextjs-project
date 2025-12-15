"use client";

import { useState, useEffect } from "react";
import type { Todo } from "@/lib/types";
import { deleteTodo, toggleTodo } from "@/lib/actions";
import { CheckCircle, Circle, Trash2 } from "lucide-react";

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Update local state when initialTodos change
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const handleToggle = async (id: number) => {
    await toggleTodo(id);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <button
            onClick={() => handleToggle(todo.id)}
            className="flex items-center gap-2 flex-1"
          >
            {todo.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
            <span
              className={`${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {todo.text}
            </span>
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete todo"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
