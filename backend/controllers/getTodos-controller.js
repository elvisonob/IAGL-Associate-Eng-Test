const items = [
  {
    id: 'm1',
    todo: 'Implement a user story',
  },

  {
    id: 'm2',
    todo: 'Organize a standup meeting',
  },

  {
    id: 'm3',
    todo: 'Write codes for the sprint',
  },
];

const getAllTodos = (req, res, next) => {
  res.send(items);
};

exports.getAllTodos = getAllTodos;
