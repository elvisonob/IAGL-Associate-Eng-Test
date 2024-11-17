const items = require('../items');

const sendTodos = (req, res, next) => {
  const { todo } = req.body;

  if (!todo || todo.trim() === '') {
    return res.status(400).json({ message: 'Todo cannot be empty' });
  }
  const newTodo = { id: Date.now(), todo };
  items.push(newTodo);
  res.status(201).json(newTodo);
};

exports.sendTodos = sendTodos;
