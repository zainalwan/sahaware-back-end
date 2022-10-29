const basicResponse = (res, code, message) => {
  return res.status(code).send({
    data: {
      message,
    },
  });
}

module.exports = {
  basicResponse,
};
