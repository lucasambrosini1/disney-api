const ContentController = require('./controller/contentController');
const ContentService = require('./service/contentService');
const ContentRepository = require('./repository/contentRepository');
const ContentModel = require('./model/contentModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function initContentModule(app, container) {
  /**
   * @type {ContentController} controller
   */
  const controller = container.get('ContentController');
  controller.configureRoutes(app);
}

module.exports = {
  ContentController, ContentService, ContentRepository, ContentModel, initContentModule,
};
