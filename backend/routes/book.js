const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/book");
const router = express.Router();

router.post("/books", async (req, res) => {
  const data = req.body;
  const book = new Book(data);
  await book.save();
  res.send(book);
});

router.get("/books", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.get("/books/:id", async (req, res) => {
  const book = await Book.find({ _id: req.params.id });
  console.log(book);
  res.send(book);
});

module.exports = router;
