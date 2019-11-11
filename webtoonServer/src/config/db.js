require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds235417.mlab.com:35417/webtoon_project`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

module.exports = mongoose;
