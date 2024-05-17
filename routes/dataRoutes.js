const express = require("express");
const router = express.Router();

const adminController = require("../controllers/controllerAdmin");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/admin/:username", adminController.findById);
router.post("/admin", adminController.create);
router.post("/admin/login", authMiddleware.login);
router.get("/admin", adminController.findAll);
router.delete("/admin/:username", adminController.delete);

module.exports = router;
