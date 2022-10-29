const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { basicResponse } = require('../util');

router.get('/', async (req, res) => {
  let result = await db.query('SELECT * FROM categories');
  if (result.rowCount <= 0) {
    return basicResponse(res, 404, 'There is no category.');
  }
  res.send({
    data: {
      categories: result.rows,
    },
  });
});

router.post('/create', async (req, res) => {
  let [scheme, credential] = req.get('authorization').split(' ');

  if (scheme.toLowerCase() != 'bearer') {
    return basicResponse(res, 401, 'Invalid authorization.');
  }

  try {
    jwt.verify(credential, process.env.SECRET_KEY);
  } catch (error) {
    return basicResponse(res, 401, 'Invalid key');
  }

  let name = req.body.name;
  if (name == undefined) {
    return basicResponse(res, 400, 'Category name is required.');
  }

  let result = await db.query(`SELECT id FROM categories
    WHERE name = '${name}'`);
  if (result.rowCount >= 1) {
    return basicResponse(res, 400, 'Category already exists.');
  }

  try {
    await db.query(`INSERT INTO categories (name) VALUES ('${name}')`);
  } catch (error) {
    return res.sendStatus(500);
  }

  result = await db.query(`SELECT * FROM categories
    WHERE name = '${name}'`);
  res.send({
    data: {
      category: result.rows[0],
    },
  });
});

router.get('/:categoryId', async (req, res) => {
  let id = req.params.categoryId;
  let result = await db.query(`SELECT * FROM categories
    WHERE id = ${id}`);
  if (result.rowCount <= 0) {
    return basicResponse(res, 404, 'Category not found.');
  }
  return res.send({
    data: {
      category: result.rows[0],
    },
  });
});

module.exports = router;
