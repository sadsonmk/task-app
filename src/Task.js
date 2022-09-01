import React from 'react'

const Task = ({ task, handleToggle }) => {
  return (
    <div>
      <input type="checkbox" checked={task.completed} onChange={() => { handleToggle(task.id) }} />
      <span>{task.name}</span>
    </div>
  )
}

export default Task