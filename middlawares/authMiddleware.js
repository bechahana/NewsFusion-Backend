const admin = require("firebase-admin");

const attachDb = (db) => (req, res, next) => {
  req.db = db;
  next();
};

const verifyToken = (roleRequired) => async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { email: decodedToken.email, uid: decodedToken.uid };

    if (roleRequired) {
      const userSnapshot = await req.db.collection("users").doc(decodedToken.uid).get();
      if (!userSnapshot.exists || userSnapshot.data().role !== roleRequired) {
        return res.status(403).json({ error: "Access denied" });
      }
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const verifyTokenAndAdmin = verifyToken("Admin");
const verifyTokenAndEditor = verifyToken("Editor");

module.exports = { attachDb, verifyToken, verifyTokenAndAdmin, verifyTokenAndEditor };
