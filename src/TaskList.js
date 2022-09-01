import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, handleToggle }) => {
  return (
    <>

      {tasks.map((task) => { return <Task key={task.id} task={task} handleToggle={handleToggle} /> })}
    </>
  )
}

export default TaskList