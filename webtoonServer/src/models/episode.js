const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image_cover: {
    type: String,
    required: true,
  },
  episode_id: {
    type: Schema.Types.ObjectId,
    ref: 'Webtoon',
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Episode', EpisodeSchema);
