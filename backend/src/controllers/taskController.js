const taskStore = require('../models/TaskStore');

const taskController = {
  getAllTasks(req, res) {
    try {
      const tasks = taskStore.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = taskStore.getTaskById(id);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  },

  createTask(req, res) {
    try {
      const { title, description, status, importance } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
      }

      const task = taskStore.createTask(
        title,
        description || '',
        status || 'pending',
        importance || 'medium'
      );
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  },

  updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status, importance, completed } = req.body;

      const updates = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (status !== undefined) updates.status = status;
      if (importance !== undefined) updates.importance = importance;
      if (completed !== undefined) updates.completed = completed;

      const task = taskStore.updateTask(id, updates);

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deleted = taskStore.deleteTask(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  }
};

module.exports = taskController;