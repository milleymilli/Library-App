const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');


function bookController(nav, bookService) {
  function getIndex(req, res) {
    const url = ' mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected correctly to server');
        const db = client.db(dbName);
        // debug(db);
        const col = await db.collection('books');

        const books = await col.find().toArray();

        res.render(
          'bookListView',
          {
            nav,

            title: 'My App',
            books,
          },
        );
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    debug(req.body);
    const url = ' mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected correctly to server');
        const db = client.db(dbName);
        // debug(db);
        const col = await db.collection('books');
        // debug(col);
        const book = await col.findOne({ _id: new ObjectID(id) });
        // debug(book);


        book.details = await bookService.getbookById(book.bookId);
        debug(book.details);
        res.render(
          'bookView',
          {
            nav,
            title: 'My App',
            book,
          },
        );
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }
  function middleWare(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  return {
    middleWare,
    getById,
    getIndex,
  };
}
module.exports = bookController;
