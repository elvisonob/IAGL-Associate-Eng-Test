const items = require('../items');

const getAllTodos = (req, res, next) => {
  res.status(200).json(items);
};

exports.getAllTodos = getAllTodos;
