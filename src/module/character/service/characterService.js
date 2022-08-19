const Character = require('../entity/character');

module.exports = class characterService {
  constructor(characterRepository) {
    this.characterRepository = characterRepository;
  }

  async save(character) {
    if (character === undefined) {
      throw new Error('Character is not defined');
    }
    return this.characterRepository.save(character);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('Character is not defined');
    }
    return this.characterRepository.deleteById(id);
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('Character is not defined');
    }
    return this.characterRepository.getById(id);
  }

  async getAll(querys) {
    return this.characterRepository.getAll(querys);
  }
};
