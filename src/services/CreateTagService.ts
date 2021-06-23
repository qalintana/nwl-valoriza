import { getCustomRepository } from 'typeorm';
import { TagsRepository } from '../repositories/TagsRepository';

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepository);

    if (!name) {
      throw new Error('incorrect name');
    }

    const tagAlreadExists = await tagsRepositories.findOne({ name });

    if (tagAlreadExists) {
      throw new Error('Tag Already exists!');
    }

    const tag = tagsRepositories.create({ name });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
