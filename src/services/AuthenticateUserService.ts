import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import { UsersRepositories } from '../repositories/UserRepository';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error('Email/password incorrect');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Email/password incorrect');
    }

    const token = sign(
      { email: user.email },
      '1768906a8006884de4b6d820d4780dd4',
      {
        expiresIn: '1d',
        subject: user.id,
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
