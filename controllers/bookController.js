const Book = require("../models/Book");

exports.addBook = async (req, res, next) => {
  try {
    // Setting available quantity equal to initial stock quantity
    const book = await Book.create({ ...req.body, availableQuantity: req.body.quantity });
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    let query = {};

    // Bonus Features: Search and Filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }
    if (category) query.category = category;

    // Bonus Feature: Pagination
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    next(error);
  }
};

exports.getBookDetails = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};