const express = require("express");
const { getMembers, deleteMember, getMyBooks } = require("../controllers/memberController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Member specific view
router.get("/me/books", authMiddleware, roleMiddleware(["member"]), getMyBooks);

// Librarian specific views
router.route("/")
  .get(authMiddleware, roleMiddleware(["librarian"]), getMembers);
router.route("/:id")
  .delete(authMiddleware, roleMiddleware(["librarian"]), deleteMember);

module.exports = router;