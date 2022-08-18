const { fromModelToEntity } = require('../mapper/genreMapper');

module.exports = class genreRepository {
  constructor(genreModel, contentModel) {
    this.genreModel = genreModel;
    this.contentModel = contentModel;
  }

  async save(genre) {
    let genreModel;
    const buildOptions = { isNewRecord: !genre.id };
    genreModel = this.genreModel.build(genre, buildOptions);
    genreModel = await genreModel.save();

    return fromModelToEntity(genreModel);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('Genre is not defined');
    }
    return Boolean(await this.genreModel.destroy({ where: { id } }));
  }

  async getById(id) {
    const genreModel = await this.genreModel.findOne({
      where: { id },
      include: {
        model: this.contentModel,
        attributes: ['id', 'name', 'image', 'date', 'rating'],
      },
    });
    if (!genreModel) {
      throw new Error(`Genre with ID: ${id} has not been found`);
    }
    return fromModelToEntity(genreModel);
  }

  async getAll() {
    const genres = await this.genreModel.findAll({
      include: {
        model: this.contentModel,
        attributes: ['id', 'name', 'image', 'date', 'rating'],
      },
    });

    return genres.map(fromModelToEntity);
  }
};
