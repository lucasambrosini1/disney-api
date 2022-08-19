const { fromDataToEntity } = require('../mapper/genreMapper');
const authMiddleware = require('../../../middlewares/authMiddleware');
const {
  validateSave, validateDelete, validateView, validateEdit,
} = require('../../../validators/genreValidators');

module.exports = class GenreController {
  /**
* @param (import("../service/genreService")) genreService
     */
  constructor(genreService, uploadMiddleware) {
    this.genreService = genreService;
    this.uploadMiddleware = uploadMiddleware;
    this.ROUTE_BASE = '/genres';
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

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res, next) {
    try {
      const genres = await this.genreService.getAll();
      res.json(genres);
    } catch (e) {
      next(e);
    }
  }

  async view(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await this.genreService.getById(id);
      res.json(genre);
    } catch (e) {
      next(e);
    }
  }

  async save(req, res, next) {
    try {
      const data = { ...req.body };
      const genre = fromDataToEntity(data);
      const rta = await this.genreService.save(genre);
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
      const editedGenre = fromDataToEntity(data);
      const rta = await this.genreService.save(editedGenre);
      res.json(rta);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const rta = await this.genreService.deleteById(id);
      res.json(rta);
    } catch (e) {
      next(e);
    }
  }
};
