const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

const adminLayout = '../views/layouts/admin'; //This is the path to the admin layout


//Get Admin or Login page
router.get('/admin', async (req, res) => {  //inside the '' if I put /about it will be the about page
    try {
        const locals = {
            title: 'Admin ',
            description: 'Simple log created with NodeJs, ExpressJs and MongoDB'
        }
        res.render('admin/index', { locals, layout: adminLayout }); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
    } catch (error) {
        console.log(error);
    }
});

//post Admin - Check Login 
router.post('/admin', async (req, res) => {  //inside the '' if I put /about it will be the about page
    try {
        const { username, password } = req.body;
        
        res.render('admin/index', { locals, layout: adminLayout }); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
    } catch (error) {
        console.log(error);
    }
});

module.exports= router; 