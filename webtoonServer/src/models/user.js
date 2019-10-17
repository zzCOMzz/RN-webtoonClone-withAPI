const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  favourite: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Webtoon',
    },
  ],
  image_profile: String,
  my_creation: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Webtoon',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
