const passport = require('passport');
const { Strategy } = require('passport-local');
// when a user logs in we go to mongo then we confirm from ther
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({ // it will deal to pull it out from the body
    userNameField: 'username', // hey strategy our UNF is UN
    passwordField: 'password',
  }, (username, password, done) => {
    const url = ' mongodb://localhost:27017';// standard port that everything runs on
    const dbName = 'libraryApp'; // dataBase name

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);

        debug('connected correctly to server');

        const db = client.db(dbName);
        // debug(db);
        const col = db.collection('users');

        const user = await col.findOne({ username });
        debug(user);
        // eslint-disable-next-line no-cond-assign
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }
      // close connection
      client.close();
    }());
  }));
};
