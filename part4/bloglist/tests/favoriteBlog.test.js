const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const { blogZero, blogOne, blogs } = require("./testValues");

describe("Favorite Blog", () => {
  test("If list is empty", () => {
    expect(favoriteBlog(blogZero)).toBe(0);
  });

  test("If there is 1 entry in list", () => {
    expect(favoriteBlog(blogOne)).toEqual(blogOne);
  });

  test("Return blog with the most amount of likes", () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});
