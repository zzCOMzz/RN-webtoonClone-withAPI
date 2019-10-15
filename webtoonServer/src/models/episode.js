const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  title: String,
  image_url: [String],
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
