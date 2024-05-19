const express = require("express");
const router = express.Router();

const adminController = require("../controllers/controllerAdmin");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/admin/:username", authMiddleware, adminController.findById);
router.post("/admin", adminController.create);
router.post("/admin/login", adminController.login);
router.get("/admin", authMiddleware, adminController.findAll);
router.delete("/admin/:username", adminController.delete);

module.exports = router;
