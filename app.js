require('dotenv').config(); //So we can use the .env file

const express = require('express'); // We can now use the express variable to create an express ap

const app = express(); // We create an express app
const PORT = 5000 || process.env.PORT; // We set the port to 5000 or the port in the .env file

app.get('',(req, res) => {  //inside the '' if I put /about it will be the about page
    res.send("Hello World");
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//To Run type in terminal(make sure you are in the working directory)/powershell: npm run dev
//and check in the browser localhost:5000