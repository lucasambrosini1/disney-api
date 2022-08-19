const GenreController = require('./controller/genreController');
const GenreService = require('./service/genreService');
const GenreRepository = require('./repository/genreRepository');
const GenreModel = require('./model/genreModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initGenreModule(app, container) {
  /**
   * @type {GenreController} controller
   */
  const controller = container.get('GenreController');
  controller.configureRoutes(app);
}

module.exports = {
  GenreController, GenreService, GenreRepository, GenreModel, initGenreModule,
};
