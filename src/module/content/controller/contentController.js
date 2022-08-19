const { fromDataToEntity } = require('../mapper/contentMapper');
const authMiddleware = require('../../../middlewares/authMiddleware');
const {
  validateDelete, validateEdit, validateSave, validateView,
} = require('../../../validators/contentValidators');

module.exports = class ContentController {
  /**
* @param (import("../service/contentService")) contentService
     */
  constructor(contentService, uploadMiddleware) {
    this.contentService = contentService;
    this.uploadMiddleware = uploadMiddleware;
    this.ROUTE_BASE = '/movies';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, authMiddleware, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, authMiddleware, validateView, this.view.bind(this));
    app.post(`${ROUTE}/save`, authMiddleware, validateSave, this.uploadMiddleware.single('photo'), this.save.bind(this));
    app.patch(`${ROUTE}/edit/:id`, authMiddleware, validateEdit, this.uploadMiddleware.single('photo'), this.edit.bind(this));
    app.delete(`${ROUTE}/delete/:id`, authMiddleware, validateDelete, this.delete.bind(this));
  }

  async index(req, res, next) {
    try {
      const querys = req.query;
      const contents = await this.contentService.getAll(querys);
      if (!contents.length) {
        res.json('There are no created movies');
      }
      res.json(contents);
    } catch (e) {
      next(e);
    }
  }

  async view(req, res, next) {
    try {
      const { id } = req.params;
      const content = await this.contentService.getById(id);
      res.json(content);
    } catch (e) {
      next(e);
    }
  }

  async save(req, res, next) {
    try {
      const data = { ...req.body };
      const content = fromDataToEntity(data);
      await this.contentService.save(content);
      const rta = 'OK';
      res.json(rta);
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      data.id = id;
      const editedContent = fromDataToEntity(data);
      const contentModel = await this.contentService.save(editedContent);
      res.json(contentModel);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      res.json(await this.contentService.deleteById(id));
    } catch (e) {
      next(e);
    }
  }
};
