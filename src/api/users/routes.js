import express from 'express';
import validation from './validation.js';
import { createUser, listOfUsers, oneUser, modificarUser, eliminarUser } from './controllers.js';

const usersRouter = express.Router();

usersRouter.post('/', validation, createUser);
usersRouter.get('/', listOfUsers);
usersRouter.get('/:id', oneUser);
usersRouter.put('/:id', modificarUser);
usersRouter.delete('/:id', eliminarUser);
  
export default usersRouter;
