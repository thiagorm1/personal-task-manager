import { useState } from 'react'

function TaskList({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) {
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editImportance, setEditImportance] = useState('medium')

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-yellow-500'
    }
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditImportance(task.importance || 'medium')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditImportance('medium')
  }

  const saveEdit = async () => {
    if (!editTitle.trim()) return

    try {
      await onUpdateTask(editingId, {
        title: editTitle.trim(),
        importance: editImportance
      })
      cancelEdit()
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <span className="material-symbols-outlined text-[#9cabba] text-6xl mb-4">task_alt</span>
        <p className="text-[#637588] dark:text-[#9cabba] text-lg text-center">
          Nenhuma tarefa encontrada. Adicione sua primeira tarefa!
        </p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group flex items-center gap-4 bg-white dark:bg-[#1b2127] px-5 py-4 rounded-xl border transition-all shadow-sm ${
            task.completed
              ? 'bg-[#f0f2f4] dark:bg-[#14181d] border-transparent dark:border-[#283039] opacity-75 hover:opacity-100'
              : 'border-[#e5e7eb] dark:border-[#283039] hover:border-primary/50 dark:hover:border-primary/50'
          }`}
        >
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            <div className="relative flex items-center justify-center shrink-0">
              <input
                type="checkbox"
                checked={task.completed || false}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-[#9cabba] dark:border-[#3b4754] bg-transparent checked:border-primary checked:bg-primary transition-all focus:ring-0 focus:ring-offset-0"
              />
              <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 transition-opacity peer-checked:opacity-100 font-bold">
                check
              </span>
            </div>

            <div className="flex items-center gap-3 flex-1 overflow-hidden">
              <div
                className={`size-3 rounded-full ${getImportanceColor(task.importance)} shrink-0 shadow-sm cursor-pointer`}
                title={`Importância: ${task.importance === 'high' ? 'Alta' : task.importance === 'medium' ? 'Média' : 'Baixa'}`}
                onClick={() => !task.completed && startEdit(task)}
              ></div>

              {editingId === task.id ? (
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 bg-transparent border-b-2 border-primary focus:outline-none text-[#111418] dark:text-white text-lg font-normal leading-normal"
                    autoFocus
                  />
                  <select
                    value={editImportance}
                    onChange={(e) => setEditImportance(e.target.value)}
                    className="px-2 py-1 bg-transparent border border-[#e5e7eb] dark:border-[#3b4754] rounded text-sm text-[#111418] dark:text-white"
                  >
                    <option value="high">🔴 Alta</option>
                    <option value="medium">🟡 Média</option>
                    <option value="low">🟢 Baixa</option>
                  </select>
                </div>
              ) : (
                <p
                  className={`text-[#111418] dark:text-white text-lg font-normal leading-normal truncate group-hover:text-primary transition-colors cursor-pointer ${
                    task.completed
                      ? 'text-[#637588] dark:text-[#6b7280] line-through decoration-slate-400'
                      : ''
                  }`}
                  onClick={() => !task.completed && startEdit(task)}
                  title="Clique para editar"
                >
                  {task.title}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {editingId === task.id ? (
              <>
                <button
                  onClick={saveEdit}
                  className="shrink-0 flex items-center justify-center size-8 rounded-full text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                  title="Salvar"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
                <button
                  onClick={cancelEdit}
                  className="shrink-0 flex items-center justify-center size-8 rounded-full text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/20 transition-colors"
                  title="Cancelar"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEdit(task)}
                  className="shrink-0 flex items-center justify-center size-8 rounded-full text-[#637588] dark:text-[#9cabba] hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors"
                  title="Editar"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="shrink-0 flex items-center justify-center size-8 rounded-full text-[#637588] dark:text-[#9cabba] hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                  title="Excluir"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList