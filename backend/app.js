const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.post("/api/posts",(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added Successfully',
      postId : createdPost._id
    })
  });
});
app.get("/api/posts",(req,res, next) => {
  // const posts = [
  //   {
  //     id : "faddafdsdf",
  //     title: "First Post",
  //     content: "First Post's content"
  //   },
  //   {
  //     id : "fasedsfdfd",
  //     title: "second Post",
  //     content: "second Post's content"
  //   }
  // ]

  Post.find().then(documents =>{
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id",(req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:'Post Deleted!'});
    });
});

module.exports = app;
