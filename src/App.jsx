import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("")// inputted text
  const [todos, settodos] = useState([]) //this holds the value
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };


  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start min-h-screen py-10 bg-violet-100">
        <div className="max-w-3xl w-full p-5 bg-white rounded-lg shadow-lg">
          <div className="addTodo mb-5 flex flex-col gap-4">
            <h1 className='font-bold text-center text-2xl'>Chore Champ - Conquer Your Chores</h1>
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input type="text" onChange={handleChange} value={todo} className='w-full rounded-lg px-5 py-2 border border-gray-300' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
          </div>
          <div className="flex items-center mb-4">
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} className="mr-2" />
            <label>Show Finished</label>
          </div>
          <h2 className='text-xl font-bold mb-4'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5 text-center'>No Todos to display</div>}
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between items-center p-2 mb-3 bg-violet-50 rounded-lg shadow-md">
                  <div className="flex items-center flex-grow">
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className="mr-2" />
                    <div className={`flex-grow ${item.isCompleted ? "line-through" : ""}`} style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex ml-2">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
