const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('/');
});

router.post('/create', (req, res, next) => {
  res.send('/');
});

router.get('/:articleId', (req, res, next) => {
  res.send(req.params.articleId);
});

module.exports = router;
