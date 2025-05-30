const express = require('express');
const upload = require('../middleware/s3Upload');
const AWS = require('aws-sdk');

// This function receives the Book model as a parameter
module.exports = (Book) => {
  const router = express.Router();

  // Initialize S3 client with environment variables from .env
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  // GET all books
  router.get('/', async (req, res) => {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // GET single book by ID
  router.get('/:id', async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).send('Book not found');
      res.json(book);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // POST new book (with image upload to S3)
  router.post('/', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }

      // Upload file to S3
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: Date.now() + '-' + req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const s3Result = await s3.upload(params).promise();

      // Create book with S3 image URL
      const bookData = {
        ...req.body,
        imageUrl: s3Result.Location,
      };
      const newBook = await Book.create(bookData);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
