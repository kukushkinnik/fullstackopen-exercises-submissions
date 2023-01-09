const listHelper = require("../utils/list_helper").dummy;

test("testing dummy", () => {
  expect(listHelper([])).toBe(1);
});
