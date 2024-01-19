//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose");
const mongodb = require("mongodb");

mongoose.connect("mongodb+srv://Solomon216:solomonname@cluster0.g6u48ff.mongodb.net/blogDB"); 

const homeStartingContent = "Welcome to Idea Horizon, the blogsite where you can find inspiring and insightful articles on various topics related to innovation, creativity, and entrepreneurship. Whether you are a budding entrepreneur, a seasoned innovator, or a curious learner, you will find something valuable and interesting here. Our team of writers and experts share their knowledge, experience, and perspectives on how to generate, develop, and implement new ideas that can make a positive impact in the world. You can browse our categories, search for specific topics, or subscribe to our newsletter to get the latest updates. We hope you enjoy reading our blog and join us in exploring the horizon of ideas.";
const aboutContent = "Welcome to Idea Horizon, a blogsite dedicated to exploring the latest trends and innovations in various fields of knowledge. Here, you will find insightful articles, inspiring stories, and practical tips from experts and enthusiasts who share their passion for learning and discovery. Whether you are interested in science, technology, arts, culture, or anything in between, you will find something that sparks your curiosity and expands your horizon. Idea Horizon is more than just a blogsite. It is a community of like-minded people who want to exchange ideas, collaborate on projects, and create positive impact in the world. Join us today and become part of this exciting journey!";
const contactContent = "If you have any questions, comments, or feedback about Idea Horizon, the blogsite where you can find inspiring and innovative ideas for your personal and professional growth, please feel free to contact us using the form below. We appreciate your interest and support, and we will do our best to respond to your messages as soon as possible. You can also follow us on social media to stay updated on our latest posts and news. Thank you for visiting Idea Horizon, and we hope to hear from you soon."

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  async function getPosts(){
    const posts = await Post.find({});
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  }
  getPosts();
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  })
  post.save();
  res.redirect("/");

});

app.get("/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  async function getPost(){
    const posts = await Post.findOne({ _id: requestedPostId });
    res.render("post", {
      title: posts.title,
      content: posts.content
    });
  }
  getPost();
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
