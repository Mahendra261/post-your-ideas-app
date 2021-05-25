const express = require('express');
const Post = require('../models/post');
const routes = express.Router();

routes.post("",(req,res,next)=>{
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
routes.get("",(req,res, next) => {
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

routes.get("/:id", (req,res,next)=>{
Post.findById(req.params.id).then(post =>{
  if(post){
    res.status(200).json(post)
  }else{
    res.status(404).json({message: 'Post Not Found'})
  }
})
});

routes.put("/:id",(req,res,next)=>{
  const post = new Post({
    _id :  req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "Updated Successfully"
    });
  });

});

routes.delete("/:id",(req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:'Post Deleted!'});
    });
});


module.exports = routes;
