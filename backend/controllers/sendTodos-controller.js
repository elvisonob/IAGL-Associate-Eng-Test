let todos = [
  { id: 'm1', todo: 'Implement a user story' },
  { id: 'm2', todo: 'Organize a standup meeting' },
  { id: 'm3', todo: 'Write codes for the sprint' },
];

const sendTodos = (req, res, next) => {
  const { todo } = req.body;
  const newTodo = { id: Date.now(), todo }; // Generate ID and create todo
  todos.push(newTodo); // Assume `todos` is your in-memory todo array
  res.status(201).json(newTodo); // Respond with the new todo
};

exports.sendTodos = sendTodos;
