const express = require("express");
const axios = require("axios");
const path = require("path");
const {MongoClient, ObjectID} = require('mongodb');
const bodyParser = require("body-parser");
const {pointToJSONformat} = require("./utils");
const urlParser = bodyParser.urlencoded({extended: true});
const jsonParser = bodyParser.json();

const app = express();
const port = 5555;


//DB setup
const uri = "mongodb+srv://chris:SGbxGijIACwFWoxD@cluster0.2lusr.mongodb.net/mathmap?retryWrites=true&w=majority";
var pointCollection; 
MongoClient.connect(uri)
.then(client => {  
    console.log('Connected to Math Map')
    const db = client.db('mathmap');
    pointCollection =  db.collection('point');
})

    app.get('/getMap', async function(req, res) {
        var pointCursor = await pointCollection.find({}).toArray();
    // let json = {}
    // pointCursor.forEach(cursor => {
    //     json[cursor._id] = []
    // })
    // pointCursor.forEach(cursor => {
    //     let parent = cursor.parent;
    //     parent.forEach(id => {
    //         json[id].push(cursor._id)
    //     })
    // })
    // pointCursor.forEach(cursor => {
    //     pointCollection.updateOne(
    //         {_id: new ObjectID(cursor._id)},
    //         {$set: {'children': json[cursor._id]}}
    //     )
    // })
    res.send(pointToJSONformat(pointCursor));
})


if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, "..", "client/build")));
  
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, ".." , "client/build", "index.html"));
    });
  
    console.log("Trying to run on port: " + process.env.PORT || port);
    app.listen(process.env.PORT || port);
  }
  else {
    console.log("Trying to run on port: " + port);
    app.listen(port);
  }
  

