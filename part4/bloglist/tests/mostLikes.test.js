const mostLikes = require("../utils/list_helper").mostLikes;
const { blogZero, blogOne, blogs } = require("./testValues");

describe("Most Likes", () => {
  test("If list contains 0 entries", () => {
    expect(mostLikes(blogZero)).toBe(0);
  });

  test("If there is 1 entry in list", () => {
    const result = {
      author: "Michael Chan",
      likes: 7,
    };
    expect(mostLikes(blogOne)).toEqual(result);
  });

  test("Return object with author with most amout of likes", () => {
    const result = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    expect(mostLikes(blogs)).toEqual(result);
  });
});
