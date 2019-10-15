require('express-group-routes');
const express = require('express');
const cors = require('cors');
const app = express();
const {userRoutes, Auth, WebtoonRoutes} = require('./routes/');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.group('/api/v1', router => {
  router.use('/user', userRoutes);
  router.use('/auth', Auth);
  router.use('/webtoon', WebtoonRoutes);
});

module.exports = app;
