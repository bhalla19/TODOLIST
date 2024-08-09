import Navbar from './Components/Navbar'
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState(""); // Inputted text
  const [todos, setTodos] = useState([]); // This holds the value
  const [showFinished, setShowFinished] = useState(false); // State for showing completed todos
  const [isEditing, setIsEditing] = useState(false); // State to track editing
  const [editId, setEditId] = useState(null); // State to track the id being edited

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setIsEditing(true);
    setEditId(id);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    if (isEditing) {
      let newTodos = [...todos, { id: editId, todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
    }
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start min-h-screen py-10 bg-violet-100">
        <div className="max-w-3xl w-full p-5 bg-white rounded-lg shadow-lg">
          <div className="addTodo mb-5 flex flex-col gap-4">
            <h1 className="font-bold text-center text-2xl text-violet-800">Chore Champ - Conquer Your Chores</h1>
            <h2 className="text-lg font-bold text-violet-700">Add a Todo</h2>
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="w-full rounded-lg px-5 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="Enter a task..."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? "Save" : "Add"}
            </button>
          </div>

          <div className="flex items-center mb-4">
            <input
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
              className="mr-2 h-5 w-5 text-violet-600 focus:ring-violet-500"
            />
            <label className="text-violet-700 font-medium">Show Finished</label>
          </div>

          <h2 className="text-xl font-bold mb-4 text-violet-700">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5 text-center text-violet-500">No Todos to display</div>
            )}
            {todos.map((item) => {
              return (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={`todo flex justify-between items-center p-2 mb-3 bg-violet-50 rounded-lg shadow-md ${item.isCompleted ? 'bg-opacity-50' : ''}`}
                >
                  <div className="flex items-center flex-grow">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="mr-2 h-5 w-5 text-violet-600 focus:ring-violet-500"
                    />
                    <div
                      className={`flex-grow ${item.isCompleted ? "line-through text-violet-400" : ""}`}
                      style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex ml-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
