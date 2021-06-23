import { Router } from 'express';
import { CreateUsersControllers } from './controllers/CreateUserControllers';

const router = Router();

const createUserController = new CreateUsersControllers();

router.post('/users', createUserController.handle);

export { router };
