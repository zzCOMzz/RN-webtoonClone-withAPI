require('express-group-routes');
const express = require('express');
const cors = require('cors');
const serveIndex = require('serve-index');
const bodyParser = require('body-parser');

const app = express();
const {userRoutes, Auth, WebtoonRoutes} = require('./routes/');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  '/images',
  express.static('storage/uploads'),
  serveIndex('storage/uploads', {icons: true}),
);

app.group('/api/v1', router => {
  router.use('/user', userRoutes);
  router.use('/auth', Auth);
  router.use('/webtoon', WebtoonRoutes);
});

module.exports = app;
