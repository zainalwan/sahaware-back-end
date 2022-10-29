const express = require('express');
const router = express.Router();
const db = require('../db');
const { authorize } = require('../middleware');
const { basicResponse } = require('../util');

router.get('/', async (req, res) => {
  let result = await db.query('SELECT * FROM articles');
  if (result.rowCount <= 0) {
    return basicResponse(res, 404, 'There is no article.');
  }
  for (let i = 0; i < result.rowCount; i++) {
    let category = await db.query(`SELECT * FROM categories
      WHERE id = ${result.rows[i].category_id}`);
    result.rows[i].category = category.rows[0];
    delete result.rows[i].category_id;
  }
  res.send({
    data: {
      articles: result.rows,
    },
  });
});

router.post('/create', authorize, async (req, res) => {
  let title = req.body.title;
  if (title == undefined) {
    return basicResponse(res, 400, 'Article title is required.');
  }
  let content = req.body.content;
  if (content == undefined) {
    return basicResponse(res, 400, 'Article content is required.');
  }
  let categoryId = req.body.categoryId;
  if (categoryId == undefined) {
    return basicResponse(res, 400, 'Article categoryId is required.');
  }

  try {
    await db.query(`INSERT INTO articles (title, content, category_id)
      VALUES ('${title}', '${content}', ${categoryId})`);
  } catch (error) {
    return res.sendStatus(500);
  }

  let result = await db.query('SELECT * FROM articles ORDER BY -id LIMIT 1');
  res.send({
    data: {
      article: result.rows[0],
    },
  });
});

router.get('/:articleId', async (req, res) => {
  let id = req.params.articleId;
  let result = await db.query(`SELECT * FROM articles
    WHERE id = ${id}`);
  if (result.rowCount <= 0) {
    return basicResponse(res, 404, 'Article not found.');
  }
  let category = await db.query(`SELECT * FROM categories
    WHERE id = ${result.rows[0].category_id}`);
  result.rows[0].category = category.rows[0];
  delete result.rows[0].category_id;
  return res.send({
    data: {
      article: result.rows[0],
    },
  });
});

module.exports = router;
