import { useState } from "react";
import type { TodoTypes } from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";
import "../CSS/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const total = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const progress = total ? Math.round((completedCount / total) * 100) : 0;

  //Function for handling edit Actions
  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const original = todos.find((t) => t.id === id);
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: original ? original.completed : false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  //Function to delete todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (todo: TodoTypes) => {
    const updated = TodoService.updateTodo({
      ...todo,
      completed: !todo.completed,
    });
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };
  return (
    <div className="todoContainer">
      <div className="topHeader">
        <h3>Keep it up!</h3>
        <div className="progressWrapper">
          <div className="progressBar">
            <div className="progressFill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progressCount">
            {completedCount} / {total}
          </div>
        </div>
      </div>
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      {todos.map((todo) => (
        <div className="items" key={todo.id}>
          <div className="left">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
            />
            {editedTodoId === todo.id ? (
              <div className="editedText">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button
                  className="cancelBtn"
                  onClick={() => handleEditCancel()}
                >
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span className={todo.completed ? "completedText" : ""}>
                  {todo.text}
                </span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
          </div>
          <button
            className="deleteBtn"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            <RiDeleteBin5Fill />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
