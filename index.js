const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
require('dotenv').config();

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
const db = require("./api/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log(err);
        console.log("Failed to sync db: " + err.message);
    });

// parse requests of content-type - application/json
app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    console.log(path.join(__dirname, "upload/images"));
    res.json({ message: "Welcome to API Marketplace" });
});

app.use(express.static(path.join("upload")))

require('./api/routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});