const express = require("express");
const router = express.Router();
const controller = require("../controllers/boardController")
const auth = require('../middleware/auth');

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/:id/cards", controller.getWithCards);
router.post("/", auth, controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.remove)


module.exports = router;
