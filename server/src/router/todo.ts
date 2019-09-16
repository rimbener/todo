/** Rutas del segmento /todos */
import { Router } from 'express';
const multer = require('multer');

import { config } from '../config';
import TodoController from '../controller/TodoController';

const router = Router();
const multerTodos = multer({ dest: config.todosPrivateDir });

router.route('/')
    .get(TodoController.all)
    .post(multerTodos.single('image'), TodoController.create)
    .put(multerTodos.single('image'), TodoController.update)
    .delete(TodoController.removeAll);

router.route('/:id')
    .get(TodoController.one)
    .delete(TodoController.remove);

router.route('/images/:id/:fileName')
    .get(TodoController.getFiles);

export default router;
