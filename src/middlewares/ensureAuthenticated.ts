import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const decode = verify(
      token,
      '1768906a8006884de4b6d820d4780dd4'
    ) as IPayload;
    const { sub } = decode;

    request.user_id = sub;

    next();
  } catch (error) {
    return response.status(401).end();
  }
}
