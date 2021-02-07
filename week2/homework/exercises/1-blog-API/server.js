"use strict";
//gloval modules
const fs = require("fs");
//npm modules
const express = require("express");
const app = express();

//parsing requests as JSON
app.use(express.json());

//route to CREATE. Post '/blogs`
app.post("/blogs", (req, res) => createPost(req, res));
//route to UPDATE. put '/blogs/:blog`
app.put("/blogs/:blog", (req, res) => updatePost(req, res));
//route to DELETE. delete '/blogs/:blog`
app.delete("/blogs/:blog", (req, res) => deletePost(req, res));
//route to READ. get '/blogs/:blog`
app.get("/blogs/:blogTitle", (req, res) => readPost(req, res));

//handler to create a post
function createPost(req, res) {
  if (isInvalid(req)) {
    res.status(400);
    res.send("Invalid request");
    return;
  } else {
    let newPost = {
      title: req.body.title,
      content: req.body.content,
    };
    res.status(201);
    res.send("ok");
    fs.writeFileSync(`${newPost.title}`, `${newPost.content}`);
    res.end("ok");
  }
}

//handler to update a post
function updatePost(req, res) {
  if (isInvalid(req)) {
    res.status(400);
    res.send("Invalid request");
    return;
  } else {
    const title = req.params.blog;

    if (fs.existsSync(`${title}`)) {
      fs.writeFileSync(`${req.body.title}`, `${req.body.content}`);
      res.end("ok");
    } else {
      // Send response with error message
      res.send("This post does not exist!");
    }
  }
}

//handler to delete a post
function deletePost(req, res) {
  const title = req.params.blog;
  if (fs.existsSync(`${title}`)) {
    fs.unlinkSync(`${title}`);
    res.end("ok");
  } else {
    res.send("This post does not exist!");
  }
}

//handler to read a post
function readPost(req, res) {
  const blogTitle = req.params.blogTitle;
  if (fs.existsSync(`${blogTitle}`)) {
    const post = fs.readFileSync(`${blogTitle}`);
    res.status(200);
    res.send(post);
  } else {
    res.status(404);
    res.send("This post does not exist!");
  }
}

//function to deal with bad requests as a result of missing data
function isInvalid(req) {
  if (
    typeof req.body == "undefined" ||
    typeof req.body.title == "undefined" ||
    typeof req.body.content == "undefined"
  ) {
    return true;
  } else {
    false;
  }
}

app.listen(3000, console.log("server started"));
