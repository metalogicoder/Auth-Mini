const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

const secret = 'that is what I shared yesterday';

router.post('/register', function(req, res) {
  User.create(req.body) // new User + user.save
    .then(user => {
      const token = makeToken(user);
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  }
  const options = {
    expiresIn: '24h',
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;
