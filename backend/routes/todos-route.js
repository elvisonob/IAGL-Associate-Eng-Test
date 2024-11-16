const express = require('express');
const getTodosController = require('../controllers/getTodos-controller');
const sendTodosController = require('../controllers/sendTodos-controller');

const router = express.Router();

router.get('/todo', getTodosController.getAllTodos);
router.post('/todo', sendTodosController.sendTodos);

module.exports = router;
