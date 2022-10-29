require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const articleRouter = require('./routes/article');

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/article-category', categoryRouter);
app.use('/api/article', articleRouter);

module.exports = app;
