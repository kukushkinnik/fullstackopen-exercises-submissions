const totalLikes = require("../utils/list_helper").totalLikes;
const { blogZero, blogOne, blogs } = require("./testValues");

describe("Total Likes", () => {
  test("If list contains 0 entries", () => {
    expect(totalLikes(blogZero)).toBe(0);
  });

  test("If list contains only one entry", () => {
    expect(totalLikes(blogOne)).toBe(7);
  });

  test("Must return the most amount of likes", () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});
