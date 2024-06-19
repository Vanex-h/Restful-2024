const express = require("express");
const {
  createUser,
  updateUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  userLogin,
  getUserProfile
} = require("../controllers/users.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", userLogin);

router.use(isAuthenticated);

router.get("/", getAllUsers);
router.get("/profile", getUserProfile);
router.route("/:id").put(updateUser).delete(deleteUserById).get(getUserById);
  
module.exports = router;
