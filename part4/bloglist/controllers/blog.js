const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  if (
    blog.title === undefined ||
    blog.title === null ||
    blog.url === undefined ||
    blog.url === null
  ) {
    res.status(400).end();
  } else {
    const savedBlog = await blog.save();

    res.status(201).json(savedBlog);
  }
});

module.exports = blogRouter;
