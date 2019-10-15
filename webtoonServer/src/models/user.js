const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  is_creator: {
    my_webtoon: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Webtoon',
      },
    ],
  },
  favourite: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Webtoon',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
