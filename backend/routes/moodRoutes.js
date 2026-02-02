const express = require("express");
const router = express.Router();
//GET/API/MOODS
router.get("/", (req,res) => {
    res.json(["Happy", "Sad", "Chill", "Energetic"]);
});
module.exports = router;