const router = require("express").Router()
const path = require('path')

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../page/home.html"));
});


module.exports = router