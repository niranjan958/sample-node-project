const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
  res.json(task);
};

exports.updateTask = async (req, res) => {
  await Task.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
  const updated = await Task.findByPk(req.params.id);
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: "Task deleted" });
};
