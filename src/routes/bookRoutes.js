const express = require('express');
const bookController = require('../controllers/bookController');

const bookService = require('../services/goodreadServices');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleWare } = bookController(nav, bookService);
  bookRouter.use(middleWare);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}


module.exports = router;
