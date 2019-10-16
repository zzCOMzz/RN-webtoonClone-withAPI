const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebtoonSchema = new Schema({
  webtoon_id: Schema.Types.ObjectId,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  favourite: {
    type: Number,
    default: 0,
  },
  image_banner: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Webtoon', WebtoonSchema);
