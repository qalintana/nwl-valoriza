import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUsersControllers {
  async handle(request: Request, response: Response) {
    const { name, email, admin } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, admin, email });

    return response.json(user);
  }
}

export { CreateUsersControllers };
