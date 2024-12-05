const express = require("express");
const { db } = require("../config/firebaseBackend");
const { attachDb, verifyToken } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const router = express.Router();

router.use(attachDb(db));

// User profile
router.get("/profile", verifyToken, userController.getUserProfile);
router.put("/profile", verifyToken, userController.updateUserProfile);

// User activity
router.get("/activity", verifyToken, userController.getUserActivity);
router.post("/activity", verifyToken, userController.logUserActivity);

// Suggested articles
router.post("/articles/suggested", verifyToken, userController.getSuggestedArticles);

module.exports = router;
