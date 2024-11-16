let todos = [
  { id: 'm1', todo: 'Implement a user story' },
  { id: 'm2', todo: 'Organize a standup meeting' },
  { id: 'm3', todo: 'Write codes for the sprint' },
];

const sendTodos = (req, res, next) => {
  const { todo } = req.body;

  if (!todo || todo.trim() === '') {
    return res.status(400).json({ message: 'Todo cannot be empty' }); // Respond with an error
  }
  const newTodo = { id: Date.now(), todo };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.sendTodos = sendTodos;
