import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUsersControllers } from './controllers/CreateUserControllers';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserReceiveComplimenteController } from './controllers/ListUserReceiveComplimenteController';
import { ListUserSendComplimenteController } from './controllers/ListUserSendComplimenteController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUsersControllers();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const lisTagsController = new ListTagsController();

const listUserSendComplimentsController =
  new ListUserSendComplimenteController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimenteController();

router.post('/users', createUserController.handle);

router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

router.get('/tags', ensureAuthenticated, lisTagsController.handle);

router.post('/login', authenticateUserController.handle);

router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  '/users/compliments/receive',
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);
router.get(
  '/users/compliments/send',
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);

export { router };
