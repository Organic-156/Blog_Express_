const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        
        if (req.body.username === 'admin' && req.body.password === 'password') {
            res.send('You are logged in');
        } else {
            res.send('Wrong username or password');
        }

    } catch (error) {
        console.log(error);
    }
});

//Post Admin - Register
router.post('/register', async (req, res) => {  //inside the '' if I put /about it will be the about page
    try {
        const { username, password } = req.body;
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User created', user })
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use'})
            }
            res.status(500).json({ message: 'Internal Server Error'})
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports= router; 