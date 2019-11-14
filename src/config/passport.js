const passport = require('passport');
require('./strategies/local.strategy.js')();// by using () we are executing it
// coz our l.strategy returns a function

module.exports = function passportConfig(app) {
  // eslint-disable-next-line max-len
  app.use(passport.initialize()); // this is where passport just set it's self up on the app on the request comes through
  // eslint-disable-next-line max-len
  app.use(passport.session());// this will build up the session and this is where we call serializ and deserialaiz user  we call

  passport.serializeUser((user, done) => {
    // we don't want to store the intaire user just the peace of the user,,,id
    done(null, user);// we havt to take that and store it in the session
  }); // stores the user in the session
  passport.deserializeUser((user, done) => {
    // then find user by id and we pass that user into done
    done(null, user);
  }); // to retrieves user from the session
};
// we r using passport.local authontication
