const express = require('express');
const router = express.Router();

//Routes
router.get('', (req, res) => {  //inside the '' if I put /about it will be the about page
    
    const locals = {
        title: 'NodeJs Blog',
        description: 'Simple log created with NodeJs, ExpressJs and MongoDB'
    }    
    
    res.render('index', {locals}); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
});

router.get('/about', (req, res) => {  //type localhost:5000/about, note that I added '/' 
    res.render('about'); //renders the index.ejs file
});



module.exports = router; //allows other files to use the router
