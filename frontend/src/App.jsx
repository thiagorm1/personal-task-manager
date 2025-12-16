import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      // Garantir que a importância seja definida
      const taskWithDefaults = {
        title: taskData.title,
        importance: taskData.importance || 'medium',
        completed: false
      }

      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskWithDefaults),
      })

      const newTask = await response.json()
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'DELETE',
      })

      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  const handleToggleComplete = async (id, completed) => {
    await handleUpdateTask(id, { completed })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-[#637588] dark:text-[#9cabba] text-lg">Carregando...</div>
      </div>
    )
  }

  // Adicionar tarefas de exemplo se estiver vazio
  const createSampleTasks = async () => {
    if (tasks.length === 0) {
      const sampleTasks = [
        { title: 'Revisar documentação do projeto', importance: 'high' },
        { title: 'Enviar e-mail para o cliente', importance: 'medium' },
        { title: 'Atualizar sistema operacional', importance: 'low', completed: true },
        { title: 'Planejar sprint da próxima semana', importance: 'high' }
      ]

      for (const taskData of sampleTasks) {
        try {
          await handleCreateTask(taskData)
        } catch (error) {
          console.error('Erro ao criar tarefa de exemplo:', error)
        }
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white overflow-x-hidden flex flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] dark:border-b-[#283039] px-10 py-3 bg-white/50 dark:bg-[#111418]/50 backdrop-blur-md sticky top-0 z-50 w-full">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-[32px]">check_circle</span>
          </div>
          <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Lista de Tarefas</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover bg-center"
               style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBs9P8zrDzwPPbWVsqqFlWg1Up2YLtV42_aaLJ-xsAzosBF9Gd9aK5IhYDgw5KkWThGJJOc0fLzsomyeNEm650npGWA9886jk1-k3YnIMEdCyBn4QbsqcrhcHJDbJIHFfFbyb2pU8KDf02Om7BP2oVkMhxZga_3kdRKKabbgEnf_9w81aIRqOGTc7D9fjf92cRfm9OnfBtpwWYLQFAORuRWyuP1MenzA9Rf89coGmA1nQCJt1y8wEpruv1j0WvdYVhxgBgCoPmPDdpp')"}}>
          </div>
        </div>
      </header>

      <main className="flex h-full grow flex-col items-center px-6 py-8 w-full">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center justify-center pb-8 pt-4">
            <h1 className="text-[#111418] dark:text-white tracking-light text-[32px] md:text-[40px] font-bold leading-tight text-center">
              Minhas Tarefas
            </h1>
            <p className="text-[#637588] dark:text-[#9cabba] text-base font-normal mt-2 text-center">
              Organize seu dia e priorize o que é importante
            </p>
          </div>

          {tasks.length === 0 && (
            <div className="flex justify-center mb-6">
              <button
                onClick={createSampleTasks}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                Carregar Tarefas de Exemplo
              </button>
            </div>
          )}

          <TaskForm onCreateTask={handleCreateTask} />
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>
    </div>
  )
}

export default App