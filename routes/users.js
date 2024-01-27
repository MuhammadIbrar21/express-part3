const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const expresspart2db =  mongoose.connect('mongodb://127.0.0.1:27017/expresspart2DB');

const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    default: []
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});
userSchema.plugin(passportLocalMongoose);
module.exports =  mongoose.model("user", userSchema);