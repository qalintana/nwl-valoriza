import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UserRepository';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadExists = await usersRepositories.findOne({ email });

    if (userAlreadExists) {
      throw new Error('User already exists');
    }

    const user = usersRepositories.create({ name, email, admin });

    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUserService };
