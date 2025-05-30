require('dotenv').config({ override: true });
const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');

const app = express();
app.use(express.json());

// Log environment variables for debugging
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Initialize Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log, // Enable query logging for debugging
  }
);

// Import and initialize the Book model
const Book = require('./models/Book')(sequelize);
const booksRouter = require('./routes/books')(Book);
const { authenticate } = require('./middleware/auth');

// Test the database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync({ force: true }); // Warning: 'force: true' will drop tables on restart!
  })
  .then(() => {
    console.log('Database synced');
    app.use('/books', booksRouter);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    app.listen(4000, () => {
      console.log('Server running on http://localhost:4000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
