const express = require("express");
const { db } = require("../config/firebaseBackend");
const { attachDb, verifyTokenAndEditor } = require("../middlewares/authMiddleware");
const editorController = require("../controllers/editorController");
const router = express.Router();

router.use(attachDb(db));

// Article management
router.get("/articles/own", verifyTokenAndEditor, editorController.getOwnArticles);
router.post("/articles/add", verifyTokenAndEditor, editorController.addArticle);
router.put("/articles/:id", verifyTokenAndEditor, editorController.updateArticle);
router.delete("/articles/:id", verifyTokenAndEditor, editorController.deleteArticle);

// Editor profile
router.get("/profile", verifyTokenAndEditor, editorController.getEditorProfile);
router.put("/profile", verifyTokenAndEditor, editorController.updateEditorProfile);

// Editor activity
router.get("/activity", verifyTokenAndEditor, editorController.getEditorActivity);
router.post("/activity", verifyTokenAndEditor, editorController.logEditorActivity);

module.exports = router;
