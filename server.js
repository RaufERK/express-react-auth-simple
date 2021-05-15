const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

const mongoUrl = 'mongodb://localhost/test-app';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: 'keyboardsdfsdasdsasdadsfsd8789248923472dfsdcat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl }),
  })
);

app.use((req, res, next) => {
  // просто выводим в консоль текущего ююзера
  console.log(' req.session.username =>', getUser(req));
  next();
});

const getUser = (req) => ({
  username: req.session?.username || 'no user',
});

app
  .route('/api')
  .get((req, res) => {
    // GET CURRENT USER
    res.send(getUser(req));
  })
  .post((req, res) => {
    //LOGIN
    console.log('req.body=>', req.body);
    const { username } = req.body;
    req.session.username = username;
    res.send({ username });
  })
  .delete((req, res) => {
    //LOGOUT
    console.log('req.body=>', req.body);
    req.session.destroy();
    res.send(getUser(req));
  });

app.listen(8080);
