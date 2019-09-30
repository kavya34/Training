var express = require('express');
var app =express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('"mongodb://localhost:27017/node-example',{useNewUrlParser: true, useUnifiedTopology: true});
// var details = db.collections('quantelas').find();
// details.each(function (err,doc) {
// console.log(doc);
//});
var profile = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var quantela = mongoose.model("quantela" ,profile);
app.get('/' , (req,res) => {
    // try {
    //     const client = await dbConn;
    //     const db = client.db('node-example');
  
    //     let collections = await db.collections();
    //     let documents = await Promise.all(collections.map((collection) => collection.find({}).toArray()));
  
    //     //res.json(documents);
    //     console.log(res.json(documents))
    // } catch (e) {
    //     console.error(e);
    //     res.sendStatus(500);
    // }
    res.sendFile(__dirname+'/sample.html');
});

// app.get("/getdetails", function (req, res) {   
//     quantela.find({}, function (err, names) {
//         if (err) res.json(err);
//         else res.render('index', { quantelas: names });
//     });
// });

app.post('/addname', (req,res) => {
 var myData = new quantela(req.body);
 myData.save()
 .then(data => {
     res.send(data);
 }).catch(err =>{
     res.status(400).send("Error occured while saving the data");
 });
});


app.get('/getall', (req,res) => {
    quantela.find()
    .then(quantelas => {
        res.send(quantelas);
    }).catch(err => {
        res.status(500).send({
            message: "error while retrieving the data"
        });
    });
});


app.listen(port , () => {
    console.log("node example listening on port" +port);
});