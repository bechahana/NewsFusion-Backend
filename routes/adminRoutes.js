const express = require("express");
const { db } = require("../config/firebaseBackend");
const { attachDb, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.use(attachDb(db));

// User management
router.get("/users", verifyTokenAndAdmin, adminController.getUsers);
router.post("/users/add", verifyTokenAndAdmin, adminController.addUser);
router.post("/users/:uid/role", verifyTokenAndAdmin, adminController.updateUserRole);
router.post("/users/:uid/ban", verifyTokenAndAdmin, adminController.banUser);
router.delete("/users/:uid", verifyTokenAndAdmin, adminController.deleteUser);

// Article management
router.post("/articles/add", verifyTokenAndAdmin, adminController.addArticle);
router.put("/articles/:id", verifyTokenAndAdmin, adminController.updateArticle);
router.delete("/articles/:id", verifyTokenAndAdmin, adminController.deleteArticle);
router.get("/articles", verifyTokenAndAdmin, adminController.getArticlesByCategory);

// Admin profile
router.get("/profile", verifyTokenAndAdmin, adminController.getAdminProfile);
router.put("/profile", verifyTokenAndAdmin, adminController.updateAdminProfile);

// Admin activity
router.get("/activity", verifyTokenAndAdmin, adminController.getAdminActivity);
router.post("/activity", verifyTokenAndAdmin, adminController.logAdminActivity);

module.exports = router;
