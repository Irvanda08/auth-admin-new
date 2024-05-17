const express = require("express");
const router = express.Router();
const dataController = require("../controllers/controllerData");
const adminController = require("../controllers/controllerAdmin");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/data", authMiddleware, dataController.findAll);
router.post("/data", authMiddleware, dataController.create);
router.get("/data/:id", authMiddleware, dataController.findById);
router.put("/data/:id", authMiddleware, dataController.update);
router.delete("/data/:id", authMiddleware, dataController.delete);

router.get("/admin/:username", adminController.findById);
router.post("/admin", adminController.create);
router.post("/admin/login", adminController.login);
router.get("/admin", adminController.findAll);
router.delete("/admin/:username", adminController.delete);

module.exports = router;