const jwt = require('jsonwebtoken');

// Created a middleware that we can add to any route we want to be protected
// and not let users without token to access
module.exports = function(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
