const express = require('express');
const router = express.Router();

//Routes
router.get('', (req, res) => {  //inside the '' if I put /about it will be the about page
    res.send("Hello World");
});

module.exports = router;