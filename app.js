const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');// it's built in no need to install it
const bodyParser = require('body-parser');// pull in body parse from node_modules
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express(); // instance express
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views'); // alows us to set something on our application instance
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
const nav = [{ link: '/books', title: 'Book' }, { link: '/authors', title: 'Author' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render('index', { nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Author' }], title: 'My App' });
});

app.listen(port, () => {
  debug(`am listening on port ${chalk.red(port)}`);
});
