const jwt = require('jsonwebtoken');
const { basicResponse } = require('./util');

const authorize = (req, res, next) => {
  let authorization = req.get('authorization');
  if (authorization == undefined) {
    return basicResponse(res, 401, 'Invalid credential.');
  }

  let [scheme, credential] = authorization.split(' ');
  if (scheme.toLowerCase() != 'bearer') {
    return basicResponse(res, 401, 'Invalid scheme.');
  }

  try {
    jwt.verify(credential, process.env.SECRET_KEY);
  } catch (error) {
    return basicResponse(res, 401, 'Invalid credential.');
  }

  next();
};

module.exports = {
  authorize,
};
