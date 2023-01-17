const blogRouter = require("express").Router();
const Blog = require("../models/blog");

const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1 });
  res.json(blogs);
});

blogRouter.post("/", userExtractor, async (req, res) => {
  const body = req.body;

  const user = req.user;
  console.log(user._id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
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
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  }
});

blogRouter.delete("/:id", userExtractor, async (req, res) => {
  const user = await req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).end();
  }

  if (blog.user.toString() === user.id) {
    await blog.remove();
    return res.status(204).end();
  }
});

blogRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

module.exports = blogRouter;
