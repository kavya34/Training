const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) 

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbconfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(dbconfig.url, {
     useNewUrlParser : true , useUnifiedTopology: true
 }).then( ()=> {
     console.log("Connected to database successfully");
 }).catch(err => {
     console.log("connecting to database failed" ,err);
     process.exit();
 });

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "sample application by connecting to mongodb database"});
});
//adding the routes module
require('./app/routes/notes.route.js')(app);
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});