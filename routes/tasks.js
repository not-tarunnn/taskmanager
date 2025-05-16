const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// View all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();
  res.render('index', { tasks });
}); 

// Form to add task
router.get('/add', (req, res) => {
  res.render('add');
});

// Create new task
router.post('/add', async (req, res) => {
  const { title } = req.body;
  await Task.create({ title });
  res.redirect('/');
});

// Mark task as done
router.post('/done/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { done: true });
  res.redirect('/');
});

// Delete task route
router.post('/tasks/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/'); // or wherever you want to redirect after deletion
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// Edit task route
router.post('/tasks/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  
  try {
    await Task.findByIdAndUpdate(id, { title, description });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
