const express = require("express");
const { addBook, getBooks, getBookDetails, updateBook, deleteBook } = require("../controllers/bookController");
const { borrowBook, returnBook } = require("../controllers/memberController");
const { validateBook } = require("../validators/validationRules");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// General Book CRUD
router.route("/")
  .get(authMiddleware, getBooks)
  .post(authMiddleware, roleMiddleware(["librarian"]), validateBook, addBook);

router.route("/:id")
  .get(authMiddleware, getBookDetails)
  .put(authMiddleware, roleMiddleware(["librarian"]), updateBook)
  .delete(authMiddleware, roleMiddleware(["librarian"]), deleteBook);

// Member Actions (Borrow & Return)
router.post("/:id/borrow", authMiddleware, roleMiddleware(["member"]), borrowBook);
router.post("/:id/return", authMiddleware, roleMiddleware(["member"]), returnBook);

module.exports = router;