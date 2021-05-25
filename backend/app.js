const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
// app.use( function(req, res, next) {
//   if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
//     return res.sendStatus(204);
//   }
//   return next();
// });
mongoose.connect('mongodb+srv://mahi:Ny7dXMEFwoW9wYNd@cluster0.l8oak.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to Database!');
})
.catch(()=>{
  console.log('Connection failed!');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts',postRoutes)

module.exports = app;
