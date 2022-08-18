const Content = require('../entity/content');

module.exports = class contentService {
  constructor(contentRepository, characterRepository) {
    this.contentRepository = contentRepository;
    this.characterRepository = characterRepository;
  }

  async save(content) {
    if (content === undefined) {
      throw new Error('Content is not defined');
    }
    return this.contentRepository.save(content);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('Content is not defined');
    }
    return this.contentRepository.deleteById(id);
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('Content is not defined');
    }
    return this.contentRepository.getById(id);
  }

  async getAll(querys) {
    return this.contentRepository.getAll(querys);
  }
};
