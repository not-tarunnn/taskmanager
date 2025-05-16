// app.js
const express   = require('express');
const mongoose  = require('mongoose');
const exphbs    = require('express-handlebars');
const path      = require('path');
require('dotenv').config();          // loads .env

// ────────────────────────────────────────────────────────────
// 1. Express app + middleware
// ────────────────────────────────────────────────────────────
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ────────────────────────────────────────────────────────────
// 2. Handlebars view engine
//    • helpers.formatDate gives you {{formatDate createdAt}}
// ────────────────────────────────────────────────────────────
app.engine('hbs',
  exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
      formatDate: (date) =>
        new Date(date).toLocaleString('en-IN', {
          day:    '2-digit',
          month:  'short',
          year:   'numeric',
          hour:   '2-digit',
          minute: '2-digit'
        })
    }
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ────────────────────────────────────────────────────────────
// 3. Database
// ────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// ────────────────────────────────────────────────────────────
// 4. Routes
//    All page / API logic lives in ./routes/tasks.js
// ────────────────────────────────────────────────────────────
const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes);

// ────────────────────────────────────────────────────────────
// 5. Start server
// ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started → http://localhost:${PORT}`);
});
