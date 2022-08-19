const fs = require('fs');
const path = require('path');

const {
  default: DIContainer, object, use, factory,
} = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const {
  ContentController, ContentService, ContentRepository, ContentModel,
} = require('../module/content/module');
const {
  UserController, UserService, UserRepository, UserModel,
} = require('../module/user/module');
const {
  CharacterController, CharacterService, CharacterRepository, CharacterModel,
} = require('../module/character/module');

const {
  GenreController, GenreService, GenreRepository, GenreModel,
} = require('../module/genre/module');

function configureSequelizeDatabase() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

/**
 * @param {DIContainer} container
 */
function configureUserModule(container) {
  return UserModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureCharacterModule(container) {
  return CharacterModel.setup(container.get('Sequelize'));
}

function configureGenreModule(container) {
  return GenreModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureContentModule(container) {
  const model = ContentModel.setup(container.get('Sequelize'));
  model.setupAssociations(CharacterModel, GenreModel);
  return model;
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const dir = `${process.env.MULTER_UPLOADS_DIR}/`;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.add({
    Sequelize: factory(configureSequelizeDatabase),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addUserModuleDefinitions(container) {
  container.add({
    UserController: object(UserController).construct(use('UserService')),
    UserService: object(UserService).construct(use('UserRepository')),
    UserRepository: object(UserRepository).construct(use('UserModel')),
    UserModel: factory(configureUserModule),
  });
}

/**
 * @param {DIContainer} container
 */
function addCharacterModuleDefinitions(container) {
  container.add({
    CharacterController: object(CharacterController).construct(
      use('CharacterService'),
      use('Multer'),
    ),
    CharacterService: object(CharacterService).construct(use('CharacterRepository')),
    CharacterRepository: object(CharacterRepository).construct(use('CharacterModel'), use('ContentModel')),
    CharacterModel: factory(configureCharacterModule),
  });
}

function addGenreModuleDefinitions(container) {
  container.add({
    GenreController: object(GenreController).construct(
      use('GenreService'),
      use('Multer'),
    ),
    GenreService: object(GenreService).construct(use('GenreRepository')),
    GenreRepository: object(GenreRepository).construct(use('GenreModel'), use('ContentModel')),
    GenreModel: factory(configureGenreModule),
  });
}

/**
 * @param {DIContainer} container
 */
function addContentModuleDefinitions(container) {
  container.add({
    ContentController: object(ContentController).construct(
      use('ContentService'),
      use('Multer'),
    ),
    ContentService: object(ContentService).construct(use('ContentRepository'), use('CharacterRepository')),
    ContentRepository: object(ContentRepository).construct(use('ContentModel'), use('GenreModel'), use('CharacterModel')),
    ContentModel: factory(configureContentModule),
  });
}

/**
 * @returns {DIContainer}
 */
module.exports = function configureDependencyInjection() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addUserModuleDefinitions(container);
  addCharacterModuleDefinitions(container);
  addGenreModuleDefinitions(container);
  addContentModuleDefinitions(container);
  return container;
};
