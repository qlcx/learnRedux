const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  // unique: 唯一值
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On Save Hook, encrypt password
// Before saving a model, run this function
// pre是在执行save操作之前执行的函数，可以定义多个，并用next实现业务连接，不用next只会调用第一个
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // 随机生成salt值
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt 
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypt password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;