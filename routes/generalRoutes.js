const express = require("express");
const { db } = require("../config/firebaseBackend");
const { attachDb } = require("../middlewares/authMiddleware");
const generalController = require("../controllers/generalController");
const router = express.Router();

router.use(attachDb(db));

// General article routes
router.get("/articles", generalController.getArticles);
router.get("/articles/:articleId", generalController.getArticleById);
router.post("/articles/:articleId/comments", generalController.addComment);
router.delete("/:uid/delete-account", generalController.deleteAccount);

module.exports = router;
