const Task = require("../models/Task");

async function getFilteredTasks(req, res) {
  const { isCompleted } = req.query;

  if (isCompleted !== "true" && isCompleted !== "false") {
    return res
      .status(400)
      .json({ error: 'El parámetro "isCompleted" debe ser "true" o "false".' });
  }

  const filterOptions = {};

  if (isCompleted === "true") {
    filterOptions.completed = true;
  } else if (isCompleted === "false") {
    filterOptions.completed = false;
  }

  try {
    const tasks = await Task.findAll({ where: filterOptions });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las tareas." });
  }
}

async function createTask(req, res) {
  const { title, description, completed } = req.body;


  const userId = req.user.userId;
  console.log("🚀 ~ file: taskController.js:33 ~ createTask ~ userId:", userId);

  try {
    const task = await Task.create({
      title,
      description,
      completed,
      userId: userId, // Asocia la tarea al usuario
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la tarea." });
  }
}

async function getTask(req, res) {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la tarea." });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;
    await task.save();

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar la tarea." });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    await task.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la tarea." });
  }
}

module.exports = {
  getFilteredTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
