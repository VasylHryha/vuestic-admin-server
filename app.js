require("dotenv").config();

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

// Вспомогательная функция для чтения файла с задачами
async function readTasks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Вспомогательная функция для записи задач в файл
async function writeTasks(tasks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// CREATE: Создание новой задачи
app.post('/tasks', async (req, res) => {
  const tasks = await readTasks();
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json(newTask);
});

// READ: Получение всех задач
app.get('/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// READ: Получение конкретной задачи по ID
app.get('/tasks/:id', async (req, res) => {
  const tasks = await readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// UPDATE: Обновление задачи
app.put('/tasks/:id', async (req, res) => {
  const tasks = await readTasks();
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    await writeTasks(tasks);
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// DELETE: Удаление задачи
app.delete('/tasks/:id', async (req, res) => {
  const tasks = await readTasks();
  const filteredTasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  if (tasks.length !== filteredTasks.length) {
    await writeTasks(filteredTasks);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Главная страница
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>REST API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            color: #333;
          }
          p {
            margin-bottom: 10px;
          }
          a {
            color: #0066cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Test project for REST API learning</h1>
        <p>Use <a href="/tasks">/tasks</a> to check</p>
        <p>&copy; Maxim</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
