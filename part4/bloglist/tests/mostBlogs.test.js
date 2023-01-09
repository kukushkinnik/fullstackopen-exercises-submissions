const mostBlogs = require("../utils/list_helper").mostBlogs;
const { blogZero, blogOne, blogs } = require("./testValues");

describe("Most Blogs", () => {
  test("If list contains 0 entries", () => {
    expect(mostBlogs(blogZero)).toBe(0);
  });

  test("If there is 1 entry in list", () => {
    const result = { author: "Michael Chan", blogs: 1 };
    expect(mostBlogs(blogOne)).toEqual(result);
  });

  test("Return object with author who has most amount of blogs", () => {
    const result = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    expect(mostBlogs(blogs)).toEqual(result);
  });
});
