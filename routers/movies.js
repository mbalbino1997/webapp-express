const express = require("express")
const router = express.Router()
const movieController = require("../controllers/movieController")
router.get("/", movieController.index)

router.get("/:id", movieController.show)

router.post("/reviews/:id", movieController.postReview)

module.exports = router;