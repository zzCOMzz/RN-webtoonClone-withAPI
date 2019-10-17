const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageEpisode = new Schema({
  image_id: {
    type: Schema.Types.ObjectId,
    ref: 'Episode',
  },
  image_url: {
    type: String,
    required: true,
  },
  image_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ImageEpisode', imageEpisode);
