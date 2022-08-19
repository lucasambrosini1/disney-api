module.exports = class GenreService {
  constructor(genreRepository) {
    this.genreRepository = genreRepository;
  }

  async save(genre) {
    if (genre === undefined) {
      throw new Error('Genre is not defined');
    }
    return this.genreRepository.save(genre);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('Genre is not defined');
    }
    return this.genreRepository.deleteById(id);
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('Genre is not defined');
    }
    return this.genreRepository.getById(id);
  }

  async getAll() {
    return this.genreRepository.getAll();
  }
};
