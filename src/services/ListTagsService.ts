import { getCustomRepository } from 'typeorm';
import { TagsRepository } from '../repositories/TagsRepository';

import { classToPlain } from 'class-transformer';

class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepository);

    const tags = await tagsRepositories.find();

    return classToPlain(tags);
  }
}

export { ListTagsService };
