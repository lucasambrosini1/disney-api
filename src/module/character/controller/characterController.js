const { fromDataToEntity } = require('../mapper/characterMapper');
const authMiddleware = require('../../../middlewares/authMiddleware');
const {
  validateDelete, validateEdit, validateSave, validateView,
} = require('../../../validators/characterValidators');

module.exports = class CharacterController {
  /**
* @param (import("../service/characterService")) characterService
     */
  constructor(characterService, uploadMiddleware) {
    this.characterService = characterService;
    this.uploadMiddleware = uploadMiddleware;
    this.ROUTE_BASE = '/characters';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, authMiddleware, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, authMiddleware, validateView, this.view.bind(this));
    app.post(`${ROUTE}/save`, authMiddleware, validateSave, this.uploadMiddleware.single('image'), this.save.bind(this));
    app.patch(`${ROUTE}/edit/:id`, authMiddleware, validateEdit, this.uploadMiddleware.single('image'), this.edit.bind(this));
    app.delete(`${ROUTE}/delete/:id`, authMiddleware, validateDelete, this.delete.bind(this));
  }

  async index(req, res, next) {
    try {
      const querys = req.query;
      const characters = await this.characterService.getAll(querys);
      res.json(characters);
    } catch (e) {
      next(e);
    }
  }

  async view(req, res, next) {
    try {
      const { id } = req.params;
      const character = await this.characterService.getById(id);
      res.json(character);
    } catch (e) {
      next(e);
    }
  }

  async save(req, res, next) {
    try {
      const data = { ...req.body };
      const character = fromDataToEntity(data);
      await this.characterService.save(character);
      res.json('Character created');
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      data.id = id;
      const editedCharacter = fromDataToEntity(data);
      await this.characterService.save(editedCharacter);
      res.json('Character edited');
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.characterService.deleteById(id);
    } catch (e) {
      next(e);
    }
  }
};
