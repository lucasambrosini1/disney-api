const Character = require('../../character/entity/character');
const Genre = require('../../genre/entity/Genre');
const { fromModelToEntity } = require('../mapper/contentMapper');

module.exports = class contentRepository {
  constructor(contentModel, genreModel, characterModel) {
    this.contentModel = contentModel;
    this.genreModel = genreModel;
    this.characterModel = characterModel;
  }

  async save(content) {
    let contentModel;
    const buildOptions = { isNewRecord: !content.id };
    contentModel = this.contentModel.build(content, buildOptions);
    if (!content.id) { contentModel.addCharacters(content.characters); } else {
      contentModel.setCharacters(content.characters);
    }
    contentModel = await contentModel.save();

    return fromModelToEntity(contentModel);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('Content is not defined');
    }
    return Boolean(await this.contentModel.destroy({ where: { id } }));
  }

  async getById(id) {
    const contentModel = await this.contentModel.findOne({
      where: { id },
      include: {
        model: this.characterModel,
        attributes: ['id', 'name', 'image', 'age', 'weight', 'story'],
      },
    });
    if (!contentModel) {
      throw new Error(`Content with ID: ${id} has not been found`);
    }
    return fromModelToEntity(contentModel);
  }

  async getAll(querys) {
    const { name, genreId, order } = querys;
    const options = { attributes: ['name', 'image', 'date'] };
    if (name) {
      options.name = name;
    }
    if (genreId) {
      options.genreId = genreId;
    }
    if (order && (order === 'ASC' || order === 'DESC')) {
      options.order = [
        ['date', order],
      ];
    }

    const contents = await this.contentModel.findAll(options);
    return contents;
  }
};
