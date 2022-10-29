const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { basicResponse } = require('../util');

router.post('/register', async (req, res) => {
  let {email, password} = req.body;

  let pattern = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  if (!pattern.test(email)) {
    return basicResponse(res, 400, 'Invalid email.');
  }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  try {
    await db.query(`INSERT INTO users (email, password)
      VALUES ('${email}', '${hash}');`);
  } catch (error) {
    return res.sendStatus(500);
  }

  return basicResponse(res, 200, 'Register success.');
});

router.post('/login', async (req, res) => {
  let {email, password} = req.body;

  let result = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

  if (result.rowCount <= 0) {
    return basicResponse(res, 400, 'Invalid email.');
  }

  let hash = result.rows[0].password;
  
  if (!bcrypt.compareSync(password, hash)) {
    return basicResponse(res, 400, 'Invalid password.');
  }

  let token = jwt.sign({
    email,
  }, process.env.SECRET_KEY);

  return res.send({
    data: {
      message: 'Login success',
      token,
    },
  });
});

module.exports = router;
