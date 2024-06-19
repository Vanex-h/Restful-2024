const express = require("express");
const {
  createBook,
  updateBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  getTotalBooks,
} = require("../controllers/books.controller");
const router = express.Router();

router.post("/new", createBook);
router.get("/", getAllBooks);
router.get("/total",getTotalBooks)
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBookById);
router.get("/:id", getBookById);

module.exports = router;