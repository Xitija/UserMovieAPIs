const express = require('express');
const app = express();

const { initializeDatabase } = require("./db/db.connection");

const movies = require("./routes/movies.router");
const users = require("./routes/users.router");
const auth = require("./routes/auth.router");

const { errorHandler } = require("./middlewares/error-handler.middleware");
const { routeNotFound } = require("./middlewares/route-not-found.middleware");
const { authVerify } = require('./middlewares/auth-verify.middleware');

app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('/auth', auth);
app.use('/movies', movies);
app.use('/user-details', authVerify, users);

app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});