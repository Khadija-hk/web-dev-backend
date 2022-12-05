//Import the http module
const http = require('http');

//Import the file module
const fs = require('fs');

//Import the path module
const path = require('path');

const cors = require('cors');

//Create an object called server
const server = http.createServer((req, res) => {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000,
        "Content-Type": 'application/json'
    };

    console.log(req.url)

    //If home page is requested
    if (req.url === '/') {
        //Read the file from another folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) throw err; //Throw any error

            //Change the data value in 'inspect' as html file
            res.writeHead(200, { 'Content-type': 'text/html' });

            //Display the index.html file
            res.end(data);
        })
    }

    else if (req.url === '/api') {
        fs.readFile(path.join(__dirname, 'public', 'db.json'), (err, data) => {
            if (err) throw err; //Throw any error

            //Change the data value in 'inspect' as json file
            res.writeHead(200, headers);

            //Display the db.json file
            res.end(data);
        })
    }

    else {
        res.end("<h1> Error 404: page not found!</h1>");
    }
});

//Get port of our url
const PORT = process.env.PORT || 9090;

//Run the server
server.listen(PORT, () => console.log(`our server is running ${PORT}`))