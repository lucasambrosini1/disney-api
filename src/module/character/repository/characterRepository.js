const { fromModelToEntity } = require('../mapper/characterMapper');

module.exports = class CharacterRepository {
  constructor(characterModel, contentModel) {
    this.characterModel = characterModel;
    this.contentModel = contentModel;
  }

  async save(character) {
    let characterModel;
    const buildOptions = { isNewRecord: !character.id };
    characterModel = this.characterModel.build(character, buildOptions);
    if (!character.id) { characterModel.addContent(character.content); } else {
      characterModel.setCharacters(character.content);
    }
    characterModel = await characterModel.save();

    return fromModelToEntity(characterModel);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('Character is not defined');
    }
    return Boolean(await this.characterModel.destroy({ where: { id } }));
  }

  async getById(id) {
    const characterModel = await this.characterModel.findOne({
      where: { id },
      include: {
        model: this.contentModel,
        attributes: ['id', 'name', 'date', 'rating', 'image', 'type'],
      },
    });
    if (!characterModel) {
      throw new Error(`Character with ID: ${id} has not been found`);
    }
    return fromModelToEntity(characterModel);
  }

  async getAll(querys) {
    const { name, age, idMovie } = querys;
    const options = {};
    if (name) {
      options.name = name;
    }
    if (age) {
      options.age = age;
    }

    let includeValue;

    if (idMovie) {
      includeValue = {
        model: this.contentModel,
        where: { id: idMovie },
      };
    }

    const characters = await this.characterModel.findAll({
      where: options,
      include:
        includeValue,
      attributes: ['name', 'image'],

    });
    return characters;
  }
};
