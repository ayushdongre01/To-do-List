const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = []; // In-memory storage for tasks

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Task added!' });
  } else {
    res.status(400).json({ message: 'Task content is required.' });
  }
});

// Remove a task by index
app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: 'Task removed!' });
  } else {
    res.status(404).json({ message: 'Task not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
