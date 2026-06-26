const User = require("../models/User");
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

exports.getMembers = async (req, res, next) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, message: "Member deleted" });
  } catch (error) {
    next(error);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    // Validate availability
    if (book.availableQuantity <= 0) {
      return res.status(400).json({ success: false, message: "Book is currently unavailable." });
    }

    // Check if the user already has an active borrow for this book
    const activeBorrow = await Borrow.findOne({ memberId: req.user.id, bookId: req.params.id, status: "borrowed" });
    if (activeBorrow) {
      return res.status(400).json({ success: false, message: "You have already borrowed this book." });
    }

    await Borrow.create({ memberId: req.user.id, bookId: req.params.id });
    
    // Reduce availability
    book.availableQuantity -= 1;
    await book.save();

    res.status(200).json({ success: true, message: "Book borrowed successfully." });
  } catch (error) {
    next(error);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    // Locate active borrow record
    const borrowRecord = await Borrow.findOne({ memberId: req.user.id, bookId: req.params.id, status: "borrowed" });
    if (!borrowRecord) {
      return res.status(400).json({ success: false, message: "You have not borrowed this book or it has already been returned." });
    }

    borrowRecord.status = "returned";
    borrowRecord.returnDate = Date.now();
    await borrowRecord.save();

    // Increase availability
    const book = await Book.findById(req.params.id);
    book.availableQuantity += 1;
    await book.save();

    res.status(200).json({ success: true, message: "Book returned successfully." });
  } catch (error) {
    next(error);
  }
};

exports.getMyBooks = async (req, res, next) => {
  try {
    const borrowRecords = await Borrow.find({ memberId: req.user.id }).populate("bookId", "title author category");
    res.status(200).json({ success: true, data: borrowRecords });
  } catch (error) {
    next(error);
  }
};