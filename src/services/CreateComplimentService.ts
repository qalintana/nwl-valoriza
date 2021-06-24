import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories/ComplimentsRepository';
import { UsersRepositories } from '../repositories/UserRepository';

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const userRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error('Incorrect user receiver');
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error('User receiver does not exists');
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
