const { fromDataToEntity } = require('../mapper/userMapper');
const { validateLogin, validateRegister } = require('../../../validators/authValidators');

module.exports = class UserController {
  /**
* @param (import("../service/userService")) userService
     */
  constructor(userService) {
    this.userService = userService;
    this.ROUTE_BASE = '/auth';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/login`, validateLogin, this.login.bind(this));
    app.post(`${ROUTE}/register`, validateRegister, this.save.bind(this));
    app.patch(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.delete(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  async index(req, res, next) {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async view(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const token = await this.userService.login(username, password);
      const data = {
        username, token,
      };
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async save(req, res, next) {
    try {
      const data = { ...req.body };
      const user = fromDataToEntity(data);
      const rta = await this.userService.save(user);
      res.json(rta.id);
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      data.id = id;
      const editeduser = fromDataToEntity(data);
      await this.userService.save(editeduser);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.userService.deleteById(id);
    } catch (e) {
      next(e);
    }
  }
};
