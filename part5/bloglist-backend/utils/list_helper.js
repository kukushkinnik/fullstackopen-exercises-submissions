const _ = require("lodash");

function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs[0].likes;
  }

  const likes = blogs.reduce((sum, currBlog) => (sum += currBlog.likes), 0);
  return likes;
}

function favoriteBlog(blogs) {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs;
  }

  return blogs.reduce((max, currBlog) =>
    max.likes > currBlog.likes ? max : currBlog
  );
}

function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1,
    };
  }

  const countedByAmountBlogs = _.countBy(blogs, (blog) => blog.author);

  const maxAmountOfBlogs = Math.max(...Object.values(countedByAmountBlogs));

  const authorWithMostBlogs = Object.keys(countedByAmountBlogs).find(
    (key) => countedByAmountBlogs[key] === maxAmountOfBlogs
  );

  return {
    author: authorWithMostBlogs,
    blogs: maxAmountOfBlogs,
  };
}

function mostLikes(blogs) {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  }

  const groupedByAuthor = _.groupBy(blogs, (blog) => blog.author);

  const keys = Object.keys(groupedByAuthor);

  const likes = keys.map((key) => {
    return groupedByAuthor[key].reduce(
      (likes, currAuthor) => (likes += currAuthor.likes),
      0
    );
  });

  const maxLikes = Math.max(...likes);
  const authorWithMostLikes = keys[likes.indexOf(maxLikes)];

  return {
    author: authorWithMostLikes,
    likes: maxLikes,
  };
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
