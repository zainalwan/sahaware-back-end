const jwt = require('jsonwebtoken');

const authorize = (scheme, credential) => {
  if (scheme.toLowerCase() != 'bearer') {
    return false;
  }

  try {
    jwt.verify(credential, process.env.SECRET_KEY);
  } catch (error) {
    return false;
  }

  return true;
}

const basicResponse = (res, code, message) => {
  return res.status(code).send({
    data: {
      message,
    },
  });
};

module.exports = {
  authorize,
  basicResponse,
};
