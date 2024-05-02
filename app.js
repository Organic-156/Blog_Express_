require('dotenv').config(); //So we can use the .env file

const express = require('express'); // We can now use the express variable to create an express ap
const expressLayout = require('express-ejs-layouts'); // Including the express - ejs layout
const methodOverride = require('method-override'); // Including the method override use for updating post after edit
const cookieParser = require('cookie-parser'); // Including the cookie parser
const session = require('express-session'); // Including the express session
const MongoStore  = require('connect-mongo'); // Including the connect-mongo

const connectDB = require('./server/config/db'); // We require the db.js file
const { restart } = require('nodemon');

const app = express(); // We create an express app
const PORT = 5000 || process.env.PORT; // We set the port to 5000 or the port in the .env file


//connect to Database
connectDB(); // We call the connectDB function to connect to the database
//from routerHelpers.js
const { isActiveRoute } = require('./server/helpers/routeHelpers'); 


//
app.use(express.urlencoded({ extended: true })); // We use the express urlencoded method to parse the form data
app.use(express.json()); // We use the express json method to parse the json data
app.use(cookieParser()); // We use the cookie parser
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } //Shows cookie expiration time
}));

app.use(express.static('public'));


// Template Engine 
app.use(expressLayout); // We use the express layout
app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); //View engine is set to ejs

//Global Variables
app.locals.isActiveRoute = isActiveRoute; //We set the isActiveRoute to a global variable

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//To Run type in terminal(make sure you are in the working directory)/powershell: npm run dev
//and check in the browser localhost:5000