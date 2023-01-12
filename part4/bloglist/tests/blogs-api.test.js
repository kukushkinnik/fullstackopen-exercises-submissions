const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./testHelper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsObjects = helper.blogs.map((blog) => new Blog(blog));
  const promisesArray = blogsObjects.map((blog) => blog.save());
  await Promise.all(promisesArray);
});

test("all blog posts are recived as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Some text",
    author: "Some auhtor",
    url: "Some url",
    likes: 7,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
  expect(titles).toContain(newBlog.title);
});

test("blog without title or url is not added", async () => {
  const newBlog = {
    author: "Some auhtor",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogesAtEnd = await helper.blogsInDb();

  expect(blogesAtEnd).toHaveLength(helper.blogs.length);
});

test("id is given to all blogs", async () => {
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].id).toBeDefined();
});

test("blogs without likes have default value of 0", async () => {
  const newBlog = {
    title: "Some text",
    author: "Some author",
    url: "Some url",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  const lastBlog = blogsAtEnd.at(-1);
  expect(lastBlog.likes).toBe(0);
});

afterAll(() => mongoose.connection.close());
