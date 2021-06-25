import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UserRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const useresRespositories = getCustomRepository(UsersRepositories);

  const { admin } = await useresRespositories.findOne(user_id);

  if (admin) {
    return next();
  }

  return response.status(401).json({ error: 'Não autorizado' });
}
