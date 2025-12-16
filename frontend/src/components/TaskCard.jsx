import { useState } from 'react'

function TaskCard({ task, isEditing, editForm, onEdit, onCancelEdit, onSaveEdit, onDeleteTask, onUpdateTask }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('taskId', task.id)
    e.dataTransfer.setData('currentStatus', task.status)
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    setIsDragging(false)
    e.target.style.opacity = ''
  }

  const handleSave = async () => {
    await onSaveEdit(task.id)
  }

  if (isEditing) {
    return (
      <div className="task-card task-editing">
        <input
          type="text"
          value={editForm.title}
          onChange={(e) => onEdit({ ...editForm, title: e.target.value })}
          className="edit-input"
          placeholder="Título da tarefa"
        />
        <textarea
          value={editForm.description}
          onChange={(e) => onEdit({ ...editForm, description: e.target.value })}
          className="edit-textarea"
          rows={3}
          placeholder="Descrição da tarefa"
        />
        <select
          value={editForm.status}
          onChange={(e) => onEdit({ ...editForm, status: e.target.value })}
          className="edit-select"
        >
          <option value="pending">Pendente</option>
          <option value="in-progress">Em Andamento</option>
          <option value="completed">Concluída</option>
        </select>
        <div className="edit-buttons">
          <button onClick={handleSave} className="btn btn-success btn-sm">
            Salvar
          </button>
          <button onClick={onCancelEdit} className="btn btn-secondary btn-sm">
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <div className="task-drag-indicator">⋮⋮</div>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="btn btn-warning btn-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="btn btn-danger btn-sm"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard