const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {return next(err);}

    // If a user with email does exist, return an error
    if (existingUser) {
      // 422 http状态码，请求格式正确，但是由于含有语义错误，无法响应
      return res.status(422).send({ error: 'Email is in use' });   
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    });
    user.save(function(err) {
      if (err) { return next(err); }
    });

    // Repond to request indicating the user was created
    res.json({ success: true });
  });
}