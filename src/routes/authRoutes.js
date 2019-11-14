const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router(); // create Router

function router(nav) {
  authRouter.route('/signUp') // we are creating sign-up router
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url); // open our connection
          debug('connected succesfuly to server ');
          const db = client.db(dbName); // connect to our database

          const col = db.collection('users'); // u can creat user just by using it
          debug(col);
          const users = { username, password };// creat user
          const results = await col.insertOne(users);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error.stack);
        }
      }());
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign-In',
      });
    }) // when u post anything passport will deal with that by using it's authentication
    .post(passport.authenticate('local', { // as google or fb we use localstrategy to authen this user
      // if it works
      successRedirect: '/auth/profile',
      // if it fails
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    // protect your profile from showing unles user signed in(with middleware)
    .all((req, res, next) => { // execute this function everytime somebody tries to do / profile
      if (req.user) { // if user not signed in passport won't put a user object on the session
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
