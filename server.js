const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // for enabling Cross-Origin Resource Sharing
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/todoapp'; // Change this URI as needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a Task schema and model
const taskSchema = new mongoose.Schema({
    text: String,
    done: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

app.post('/tasks', async (req, res) => {
    const taskText = req.body.text;
    if (!taskText) {
        return res.status(400).json({ error: 'Task text is required' });
    }

    try {
        const task = new Task({
            text: taskText,
            done: false
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.done = !task.done;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
