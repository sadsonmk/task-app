import React, { useState, useRef, useEffect } from 'react'
import TaskList from './TaskList';
import uuid from 'react-uuid';


const App = () => {
  // variables to hold data
  const [tasks, setTasks] = useState([])
  const inputRef = useRef()

  // local storage key
  const LOCAL_STORAGE = 'taskapp';

  // getting saved tasks
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    if (savedTasks) setTasks(savedTasks)

  }, [])

  // saving tasks
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(tasks))
  }, [tasks])


  // Adding tasks to the list
  const handleTask = (e) => {
    e.preventDefault();
    const newTask = inputRef.current.value;
    if (newTask === '') return
    setTasks(prevTask => {
      return [...prevTask, { id: uuid(), name: newTask, completed: false }]
    })
    inputRef.current.value = null;
  }

  // Handling toggle of the check button
  const handleToggle = (id) => {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.completed = !task.completed
    setTasks(newTasks)
  }

  // deleting completed tasks
  const handleDelete = (e) => {
    e.preventDefault();
    const newTasks = tasks.filter(task => !task.completed)
    setTasks(newTasks)
  }
  const head = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };

  return (
    <>
      <h1 style={head}>MY TASK APP</h1>
      {tasks.length > 0 ? <TaskList tasks={tasks} handleToggle={handleToggle} /> : <h4>You have no tasks currently!!</h4>}
      <br />
      <form action="" className="form-box">
        <label htmlFor="">
          Enter your task:
          <input ref={inputRef} type="text" />
        </label>
        <button className='button' style={{ backgroundColor: 'green' }} onClick={handleTask}>Add Task</button>
        <button className='button' style={{ backgroundColor: 'red' }} onClick={handleDelete}>Delete Task</button>
      </form>
      <h4>{tasks.filter(task => !task.completed).length} Tasks left</h4>
    </>
  )
}

export default App