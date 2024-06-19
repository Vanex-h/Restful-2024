const express = require("express");
const Book = require("../models/book");
const bcrypt = require("bcrypt");
const mysqlConnection = require("../database");
const jwt = require("jsonwebtoken");
const { CreateBook } = require("../schemas/BookValidationSchema");
const { INTEGER } = require("sequelize");

const createBook = async (req, res) => {
  try {
    const { name, author, publisher, publicationYear, subject } = req.body;
    const value = await CreateBook.validateAsync(req.body);
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    if (publicationYear > currentYear || publicationYear < 0) {
      return res.status(400).json({ message: "Invalid publication year" });
    }
    const insertQuery = `INSERT INTO books (name, author, publisher, publicationYear, subject) VALUES (?, ?, ?, ?, ?)`;
    const newBookValues = [name, author, publisher, publicationYear, subject];
    await mysqlConnection.connection.query(insertQuery, newBookValues);
    return res
      .status(200)
      .json({ message: "Book added successfully", Book: newBookValues });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const data = await Book.findAll();
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getTotalBooks = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    return res.status(200).json({ totalBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    console.log(book);
    if (book) {
      return res.json(book);
    } else {
      return res.status(404).json({ message: "That Book doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, author, publisher, publicationYear, subject } = req.body;
    const book = await Book.findByPk(id);
    console.log(book);
    if (book) {
      await book.update({
        name,
        author,
        publisher,
        publicationYear,
        subject,
      });
      return res
        .status(200)
        .json({ message: "Book updated successfully", Book: Book });
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("My id===>", id);
    const book = await Book.findByPk(id);
    console.log(book);
    if (book) {
      await book.destroy();
      return res.status(200).json({ message: "Successfully deleted the Book" });
    } else {
      return res.status(404).json({ message: "That Book doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBookProfile = async (res, req) => {
  const id = req.body.id;
  const Book = await Book.findOne(id);
  return res.status(200).json({ message: "Book profile found", Book });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBookById,
  updateBook,
  getTotalBooks,
  getBookProfile,
};
