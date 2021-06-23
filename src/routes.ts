import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUsersControllers } from './controllers/CreateUserControllers';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUsersControllers();
const createTagController = new CreateTagController();

router.post('/users', createUserController.handle);

router.post('/tags', ensureAdmin, createTagController.handle);

export { router };
