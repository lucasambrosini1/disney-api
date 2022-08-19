const CharacterController = require('./controller/characterController');
const CharacterService = require('./service/characterService');
const CharacterRepository = require('./repository/characterRepository');
const CharacterModel = require('./model/characterModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initCharacterModule(app, container) {
  /**
   * @type {CharacterController} controller
   */
  const controller = container.get('CharacterController');
  controller.configureRoutes(app);
}

module.exports = {
  CharacterController, CharacterService, CharacterRepository, CharacterModel, initCharacterModule,
};
