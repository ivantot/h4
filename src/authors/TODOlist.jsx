import "./TODOlist.css";
import { useBook, updateBook } from "../components/accessHooks";
import { useAuth } from "../components/useAuth";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

const TODO = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const authors = book.authors;
    if (authors) {
      setTodos(authors);
    }
  }, []);

  //   React.useEffect(async () => {
  //     book.authors = JSON.stringify(todos);
  //     await updateBook(35, login);
  //   }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  const [login] = useAuth();
  const book = useBook(35, login);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div>{todo.text}</div>
              )}
            </div>
            <div className="todo-actions">
              {todo.id === todoEditing ? (
                <button onClick={() => submitEdits(todo.id)}>
                  Submit Edits
                </button>
              ) : (
                <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default TODO;
