const express = require("express");
const router = express.Router();
const userRoutes = require("../controllers/user");

router.post("/user", userRoutes.createUser);
router.get("/user", userRoutes.getUsers);
router.get("/user/:id", userRoutes.getUser);
router.delete("/user/:id", userRoutes.deleteUser);
router.patch("/user", userRoutes.updateUser);

module.exports = router;
