import {
  useState,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
  type FC,
} from "react";
import TodoService from "../TodoService";
import "../CSS/TodoForm.css";
import type { TodoTypes } from "../todo";
import "../CSS/TodoForm.css";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const handleAddTodo = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodo) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  };
  return (
    <form className="inputForm" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Write your task"
      />
      <button type="submit" className="addBtn">
        +
      </button>
    </form>
  );
};

export default TodoForm;
