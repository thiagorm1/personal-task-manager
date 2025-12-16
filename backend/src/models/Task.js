const { v4: uuidv4 } = require('uuid');

class Task {
  constructor(title, description = '', status = 'pending', importance = 'medium') {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.status = status;
    this.importance = importance; // 'high', 'medium', 'low'
    this.completed = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      importance: this.importance,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Task;