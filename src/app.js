require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('../swaggerSpec.json');
const configureDependencyInjection = require('./config/di');
const { initContentModule } = require('./module/content/module');
const { initUserModule } = require('./module/user/module');
const { initCharacterModule } = require('./module/character/module');
const { initGenreModule } = require('./module/genre/module');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const container = configureDependencyInjection(app);

initUserModule(app, container);
initCharacterModule(app, container);
initGenreModule(app, container);
initContentModule(app, container);

app.use((err, req, res, next) => {
  res.status(500);
  res.json(err);
});

app.get('/', (req, res) => res.redirect('/api-docs'));
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
