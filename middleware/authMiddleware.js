const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const tokenWithoutBearer = token.split(' ')[1];
    const verified = jwt.verify(tokenWithoutBearer, 'secretkey');
    req.admin = verified;
    next();
  } catch (err) {
    console.error('Token Error : ', err);
    return res.status(403).send('Access denied, invalid token');
  }
};