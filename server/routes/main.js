const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Routes
//Get Home
router.get('', async (req, res) => {  //inside the '' if I put /about it will be the about page
    
    try {
        const locals = {
            title: 'NodeJs Blog',
            description: 'Simple log created with NodeJs, ExpressJs and MongoDB'
        }    

        let perPage = 12;
        let page = req.query.page || 1; //grabbing the URl Query 

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        // const count = await Post.count(); //is deprecated
        const count = await Post.countDocuments({}); //is the new way to count the number of documents in the collection
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals, 
            data, 
            current: page, 
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

        res.render('index', { locals, data }); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
    } catch (error) {
        console.log(error);
    }
});

// Get Post id
router.get('/post/:id', async (req, res) => {  //inside the '' if I put /about it will be the about page
    try {
        
        let slug  = req.params.id;
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: 'Simple log created with NodeJs, ExpressJs and MongoDB',
            currentRoute: `/post/${slug}`
        }

    
        
        res.render('post', { locals, data }); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
    } catch (error) {
        console.log(error);
    }
});

//Get post search
router.post('/search', async (req, res) => {  //inside the '' if I put /about it will be the about page
    try {
        
        const locals = {
            title: 'Search',
            description: 'Simple log created with NodeJs, ExpressJs and MongoDB'
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or:[
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        })
        
        // const data = await Post.find();
        res.render("search", {
            data,
            locals,
            currentRoute: '/'
            }); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
    
        } catch (error) {
        console.log(error);
    }
});


router.get('/about', (req, res) => {  //type localhost:5000/about, note that I added '/' 
    res.render('about', {
        currentRoute: '/about'
    }); //renders the index.ejs file
});

module.exports = router; //allows other files to use the router


// UNCOMMENT THIS IF YOU ONLY DONT WANT TO HAVE PAGINATION
// router.get('', async (req, res) => {  //inside the '' if I put /about it will be the about page
//     const locals = {
//         title: 'NodeJs Blog',
//         description: 'Simple log created with NodeJs, ExpressJs and MongoDB'
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data }); //renders the index.ejs file and passed the locals object (I can pass multiple objects with the {} )
//     } catch (error) {
//         console.log(error);
//     }
// });

// ONLY EXECUTE THIS FUNCTION ONCE TO INSERT DATA INTO THE DATABASE
// function insertPostData () { //Insert Data into the database and it is now commented to stop executing multiple
//     Post.insertMany([
//     {
//     title: "Building APIs with Node.js",
//     body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//     title: "Deployment of Node.js applications",
//     body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//     title: "Authentication and Authorization in Node.js",
//     body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//     title: "Understand how to work with MongoDB and Mongoose",
//     body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//     title: "build real-time, event-driven applications in Node.js",
//     body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//     title: "Discover how to use Express.js",
//     body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//     title: "Asynchronous Programming with Node.js",
//     body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//     title: "Learn the basics of Node.js and its architecture",
//     body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//     title: "NodeJs Limiting Network Traffic",
//     body: "Learn how to limit netowrk traffic."
//     },
//     {
//     title: "Learn Morgan - HTTP Request logger for NodeJs",
//     body: "Learn Morgan."
//     },
//     ])
// }

// function insertPostData() {
//     Post.insertMany([
//         {
//         title: "This is some Random Title",
//         body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
//         },
//         {
//         title: "Python is a great language",
//         body: "Python is a great language for beginners"
//         },
//     ]);
// }
// insertPostData();