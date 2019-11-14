/* eslint-disable eol-last */
const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {

    title: 'War and PEace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false,
  },
  {

    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hogo',
    bookId: 24280,
    read: false,
  },
  {

    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    bookId: 1027,
    read: false,
  },
  {
    title: 'The Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false,
  },
  {
    title: 'The Wind in the willows',
    genre: 'Fantasy',
    author: 'Kenneth Grhame',
    read: false,
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twin',
    read: false,
  },
  {
    title: 'Childhood',
    genre: 'Fantasy',
    author: 'Kenneth Grhame',
    read: false,
  },
];
function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = ' mongodb://localhost:27017';// standard port that everything runs on
      const dbName = 'libraryApp'; // dataBase name

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected correctly to server');
          const db = client.db(dbName);
          // debug(db);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;