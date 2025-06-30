const express = require("express");
const router = express.Router();
const cardController = require ("../controllers/cardController");

router.get("/", cardController.getAll);
router.get("/:id", cardController.getByBoardId);
router.post("/:id", cardController.create);
router.put("/:id", cardController.update);
router.delete("/:id", cardController.remove);

module.exports = router;
