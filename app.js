const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');
require("dotenv").config();

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views', 'partials')  // Note the commas!
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
console.log('Partials dir:', path.join(__dirname, 'views', 'partials'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
