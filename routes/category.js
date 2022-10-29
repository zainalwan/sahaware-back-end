const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('/');
});

router.post('/create', (req, res, next) => {
  res.send('/create');
});

router.get('/:categoryId', (req, res, next) => {
  res.send(req.params.categoryId);
});

module.exports = router;
