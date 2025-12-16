# Gerenciador de Tarefas

Um aplicativo web completo para gerenciamento de tarefas com frontend em React/Vite e backend em Node.js.

## Estrutura do Projeto

```
gps/
├── backend/          # API Node.js com Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/         # Aplicação React com Vite
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   ├── package.json
│   └── ...
└── README.md
```

## Funcionalidades

- ✅ Criar tarefas
- ✅ Listar todas as tarefas
- ✅ Editar tarefas
- ✅ Deletar tarefas
- ✅ Gerenciar status (Pendente, Em Andamento, Concluída)
- ✅ Interface responsiva
- ✅ Armazenamento persistente (JSON)

## Como Usar

### 1. Instalar Dependências

```bash
# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

### 2. Rodar a Aplicação

**Opção 1: Rodar separadamente**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Opção 2: Rodar ambos (recomendado)**

```bash
# Na raiz do projeto
npm run start:all
```

### 3. Acessar

- Frontend: http://localhost:5173
- API: http://localhost:3001

## Estrutura da API

### Endpoints

- `GET /api/tasks` - Lista todas as tarefas
- `GET /api/tasks/:id` - Busca tarefa por ID
- `POST /api/tasks` - Cria nova tarefa
- `PUT /api/tasks/:id` - Atualiza tarefa
- `DELETE /api/tasks/:id` - Deleta tarefa

### Modelo de Dados

```javascript
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "pending|in-progress|completed",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

## Desenvolvimento

### Scripts Disponíveis

#### Backend
- `npm start` - Roda servidor em produção
- `npm run dev` - Roda servidor com nodemon

#### Frontend
- `npm run dev` - Roda servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build

## Tecnologias

### Backend
- Node.js
- Express.js
- CORS
- UUID
- Armazenamento em JSON

### Frontend
- React 18
- Vite
- JavaScript moderno
- CSS Grid/Flexbox
- Fetch API

## Licença

MIT