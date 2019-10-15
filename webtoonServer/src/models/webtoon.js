const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebtoonSchema = new Schema({
  webtoon_id: Schema.Types.ObjectId,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  favourite: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  episode: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Episode',
    },
  ],
});

module.exports = mongoose.model('Webtoon', WebtoonSchema);
