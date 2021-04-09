const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
const mongoUrl = 'mongodb://localhost/test-app';

app.use(
  session({
    secret: 'keyboardsdfdsfsdfdfsdcat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl }),
  })
);

app.use((req, res, next) => {
  console.log(' req.session.username =>', req.session.username);
  next();
});

const getUser = (req) => ({
  username: (req.session && req.session.username) || 'no session',
});

app
  .route('/api')
  .get((req, res) => {
    // TEST URSER
    res.send({ username: req.session.username });
  })
  .post((req, res) => {
    //LOGIN
    console.log('req.body=>', req.body);
    const { username } = req.body;
    req.session.username = username;
    res.send({ username: req.session.username });
  })
  .delete((req, res) => {
    //LOGOUT
    console.log('req.body=>', req.body);
    req.session.destroy();

    res.send(getUser(req));
  });

app.listen(8080);
