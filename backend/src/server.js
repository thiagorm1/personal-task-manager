require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo ao Gerenciador de Tarefas API' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});