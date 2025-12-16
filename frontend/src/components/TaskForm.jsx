import { useState } from 'react'

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState('')
  const [importance, setImportance] = useState('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onCreateTask({
        title: title.trim(),
        importance
      })

      setTitle('')
      setImportance('medium')
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <>
      <div className="w-full mb-10">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-stretch shadow-lg dark:shadow-none p-2 rounded-xl bg-white dark:bg-[#1b2127] border border-[#e5e7eb] dark:border-[#3b4754]">
          <div className="flex-1 flex items-center px-3">
            <span className="material-symbols-outlined text-[#9cabba] mr-2">add_task</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input w-full bg-transparent border-none focus:ring-0 text-[#111418] dark:text-white placeholder:text-[#9cabba] text-base h-12"
              placeholder="Adicionar nova tarefa..."
              disabled={isSubmitting}
            />
          </div>

          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            className="px-4 h-12 bg-transparent border-l border-[#e5e7eb] dark:border-[#3b4754] text-[#111418] dark:text-white focus:ring-0 outline-none appearance-none cursor-pointer"
            disabled={isSubmitting}
          >
            <option value="high">🔴 Alta</option>
            <option value="medium">🟡 Média</option>
            <option value="low">🟢 Baixa</option>
          </select>

          <button
            type="submit"
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shrink-0"
            disabled={isSubmitting || !title.trim()}
          >
            <span className="truncate">{isSubmitting ? 'Adicionando...' : 'Adicionar'}</span>
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center gap-6 mb-6 text-sm text-[#637588] dark:text-[#9cabba]">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500"></div>
          <span>Alta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-yellow-500"></div>
          <span>Média</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-green-500"></div>
          <span>Baixa</span>
        </div>
      </div>
    </>
  )
}

export default TaskForm