const User = require('../models/user');
const jwt = require('jwt-simple');  //jsow web tokens
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  //编码
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'does
  // We just need to then a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

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

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}