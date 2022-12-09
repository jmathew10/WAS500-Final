const express = require("express");
const api = express.Router();
const Book = require("../models/book");
var ObjectId = require("mongodb").ObjectId;
var mongoose = require("mongoose");

// GET all books
api.get("/booksList", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.render("books.ejs", { books: books });
    }
  });
});

// GET book by id
api.get("/books/:bookID", (req, res) => {
  Book.findOne({ _id: ObjectId(req.params.bookID) }, (err, book) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render("book.ejs", { book: book });
    }
  });
});

// POST new book
api.post("/addnewbook", (req, res) => {
  console.log(req.body);
  // get the last id in the collection
  Book.find({}, (err, books) => {
    if (err) {
      res.status;
    } else {
      // check if there are any books in the collection
      if (books.length > 0) {
        // get the last book in the collection
        let lastBook = books[books.length - 1];
        // get the last book's id
        let lastBookID = lastBook.id;
        // increment the last book's id by 1
        let newBookID = lastBookID + 1;
        // create a new book object
        let newBook = new Book({
          _id: new mongoose.Types.ObjectId(),
          id: newBookID,
          name: req.body.bookName,
          authorName: req.body.authorName,
          description: req.body.bookDescription || "",
          bookImage: req.body.bookImage || "",
        });
        // save the new book to the database
        newBook.save((err, book) => {
          if (err) {
            console.log("Error saving book: " + err);
            res.status(500).send(err);
          } else {
            res.redirect("/admin");
          }
        });
      } else {
        // create a new book object
        let newBook = new Book({
          _id: new mongoose.Types.ObjectId(),
          id: 1,
          name: req.body.bookName,
          authorName: req.body.authorName,
          description: req.body.bookDescription || "",
          bookImage: req.body.bookImage || "",
        });
        // save the new book to the database
        newBook.save((err, book) => {
          if (err) {
            console.log("Error saving book: " + err);
            res.status(500).send(err);
          } else {
            res.redirect("/admin");
          }
        });
      }
    }
  });
});

api.get("/edit/:id", (req, res) => {
  Book.findOne({ id: req.params.id }, (err, book) => {
    if (err) {
      res.status;
    } else {
      res.render("edit.ejs", { book: book });
    }
  });
});

// admin page - GET all books
api.get("/admin", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.render("admin.ejs", { books: books });
    }
  });
});

// PUT update book
api.put("/books/:bookID", (req, res) => {
  Book.findOneAndUpdate(
    { id: req.params.bookID },
    req.body,
    { new: true },
    (err, book) => {
      if (err) {
        res.status(500).send(
          // ("Error occurred: database error.");
          err
        );
      } else {
        res.status(200).send(book);
      }
    }
  );
});

// DELETE book
api.delete("/admin/:bookID", (req, res) => {
  Book.findOneAndRemove({ id: req.params.bookID }, (err, book) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(book);
    }
  });
});

// addnewbook page
api.get("/addnewbook", (req, res) => {
  res.render("addnewbook.ejs");
});

module.exports = api;
