const express = require("express");
const router = express.Router();
const postRoutes = require("../controllers/post");

router.post("/post", postRoutes.createPost);
router.get("/post", postRoutes.getPosts);
router.delete("/post/:id", postRoutes.deleteUser);
router.patch("/post", postRoutes.updateUser);

module.exports = router;
