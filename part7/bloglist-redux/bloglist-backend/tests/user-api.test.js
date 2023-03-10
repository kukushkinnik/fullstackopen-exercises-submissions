const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");
const helper = require("./testHelper");

describe("Creating and getting users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const hashedPassword = bcrypt.hash("root", 10);
    const user = new User({ username: "roooooot", password: hashedPassword });

    await user.save();
  });

  test("a user can be created", async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: "Helloooo0",
      name: "Hello",
      password: "hello",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(user.username);
  });

  test("a username must be unique", async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: "roooooot",
      name: "root",
      password: "root",
    };

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("username or password not define", async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      name: "Hello",
    };

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain(
      "username and password must be define"
    );

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
