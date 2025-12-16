function TaskPopup({ task, onClose }) {
  if (!task) return null

  const getImportanceLabel = (importance) => {
    switch (importance) {
      case 'high':
        return '🔴 Alta'
      case 'medium':
        return '🟡 Média'
      case 'low':
        return '🟢 Baixa'
      default:
        return '🟡 Média'
    }
  }

  const getStatusText = (completed) => {
    return completed ? 'Concluída' : 'Pendente'
  }

  return (
    <div
      className="task-popup-backdrop"
      onClick={onClose}
    >
      <div
        className="task-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-white text-2xl font-bold leading-tight flex-1 mr-4">
            {task.title}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center size-8 rounded-full text-[#9cabba] hover:bg-white/10 transition-colors"
            title="Fechar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-[#9cabba] text-base font-medium min-w-[80px]">
              Status:
            </span>
            <span className={`text-lg font-medium ${
              task.completed
                ? 'text-green-400'
                : 'text-yellow-400'
            }`}>
              {getStatusText(task.completed)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#9cabba] text-base font-medium min-w-[80px]">
              Importância:
            </span>
            <span className="text-lg font-medium text-white">
              {getImportanceLabel(task.importance)}
            </span>
          </div>

          {task.description && (
            <div>
              <h3 className="text-[#9cabba] text-base font-medium mb-3">
                Descrição:
              </h3>
              <p className="text-white text-base leading-relaxed">
                {task.description}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-[#283039]">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-base font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskPopup