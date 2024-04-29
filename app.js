require('dotenv').config(); //So we can use the .env file

const express = require('express'); // We can now use the express variable to create an express ap
const expressLayout = require('express-ejs-layouts'); // Including the express - ejs layout

const connectDB = require('./server/config/db'); // We require the db.js file

const app = express(); // We create an express app
const PORT = 5000 || process.env.PORT; // We set the port to 5000 or the port in the .env file


//connect to Database
connectDB(); // We call the connectDB function to connect to the database

app.use(express.static('public'));


// Template Engine 
app.use(expressLayout); // We use the express layout
app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); //View engine is set to ejs

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//To Run type in terminal(make sure you are in the working directory)/powershell: npm run dev
//and check in the browser localhost:5000