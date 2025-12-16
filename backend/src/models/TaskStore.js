const Task = require('./Task');

class TaskStore {
  constructor() {
    this.tasks = new Map();
    this.loadTasks();
  }

  loadTasks() {
    const fs = require('fs');
    const path = require('path');

    try {
      const dataPath = path.join(__dirname, '../../data/tasks.json');
      if (fs.existsSync(dataPath)) {
        const tasksData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        tasksData.forEach(taskData => {
          const task = new Task();
          Object.assign(task, taskData);
          this.tasks.set(task.id, task);
        });
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error.message);
    }
  }

  saveTasks() {
    const fs = require('fs');
    const path = require('path');

    try {
      const dataPath = path.join(__dirname, '../../data/tasks.json');
      const dataDir = path.dirname(dataPath);

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const tasksArray = Array.from(this.tasks.values());
      fs.writeFileSync(dataPath, JSON.stringify(tasksArray, null, 2));
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error.message);
    }
  }

  createTask(title, description, status, importance) {
    const task = new Task(title, description, status, importance);
    this.tasks.set(task.id, task);
    this.saveTasks();
    return task;
  }

  getAllTasks() {
    return Array.from(this.tasks.values());
  }

  getTaskById(id) {
    return this.tasks.get(id);
  }

  updateTask(id, updates) {
    const task = this.tasks.get(id);
    if (task) {
      task.update(updates);
      this.saveTasks();
      return task;
    }
    return null;
  }

  deleteTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      this.tasks.delete(id);
      this.saveTasks();
      return true;
    }
    return false;
  }
}

module.exports = new TaskStore();