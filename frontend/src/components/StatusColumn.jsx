import { useState } from 'react'
import TaskCard from './TaskCard'

function StatusColumn({
  status,
  tasks,
  title,
  color,
  onUpdateTask,
  onDeleteTask,
  editingTask,
  editForm,
  onEditTask,
  onCancelEdit,
  onSaveEdit
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const taskId = e.dataTransfer.getData('taskId')
    const currentStatus = e.dataTransfer.getData('currentStatus')

    if (taskId && currentStatus !== status) {
      onUpdateTask(taskId, { status })
    }
  }

  return (
    <div
      className={`status-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header" style={{ backgroundColor: color }}>
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="column-tasks">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <p>Nenhuma tarefa {title.toLowerCase()}</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isEditing={editingTask === task.id}
              editForm={editingTask === task.id ? editForm : {}}
              onEdit={onEditTask}
              onCancelEdit={onCancelEdit}
              onSaveEdit={onSaveEdit}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default StatusColumn