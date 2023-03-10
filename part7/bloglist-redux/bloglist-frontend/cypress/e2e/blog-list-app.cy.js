describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "test",
      name: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);

    const user2 = {
      username: "test1",
      name: "test1",
      password: "test1",
    };
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
  });

  describe("Login", function () {
    it("login is working", function () {
      cy.contains("log in").click();
      cy.login({ username: "test", password: "test" });
      cy.contains("new blog");
    });

    it("failed login", function () {
      cy.contains("log in").click();
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login_btn").click();
      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click();
      cy.login({ username: "test", password: "test" });
    });

    it("when logged in, new blog can be created", function () {
      cy.get("#toggle_btn").click();
      cy.createBlog({
        title: "cypress test",
        author: "cypress",
        url: "cypress test",
      });
      cy.contains("cypress test");
    });

    it("logged in user can like a blog", function () {
      cy.get("#toggle_btn").click();
      cy.createBlog({
        title: "cypress test",
        author: "cypress",
        url: "cypress test",
      });
      cy.get("#viewHide_btn").click();
      cy.get("#like_btn").click();
      cy.contains("likes 1");
    });

    it("blog can be deleted by user, who added it", function () {
      cy.get("#toggle_btn").click();
      cy.createBlog({
        title: "cypress test",
        author: "cypress",
        url: "cypress test",
      });
      cy.get("#viewHide_btn").click();
      cy.get("#delete_btn").click();
      cy.get("html").should("not.contain", "cypress test");
      cy.contains("Blog was deleted");
    });

    it("another user can not delete blog", function () {
      cy.get("#toggle_btn").click();
      cy.createBlog({
        title: "cypress test",
        author: "cypress",
        url: "cypress test",
      });

      cy.get("#logout_btn").click();

      cy.contains("log in").click();
      cy.login({ username: "test1", password: "test1" });
      cy.get("#viewHide_btn").click();
      cy.get("html").should("not.contain", "#delete_btn");
    });
  });
  describe("Blogs ordered by number of likes", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
      cy.createBlog({
        title: "cypress test1",
        author: "cypress1",
        url: "cypress test1",
      });

      cy.createBlog({
        title: "cypress test2",
        author: "cypress2",
        url: "cypress test2",
      });

      cy.createBlog({
        title: "cypress test3",
        author: "cypress3",
        url: "cypress test3",
      });
    });
    it("sorted by default", function () {
      cy.get(".blog").eq(0).should("contain", "cypress test1");
      cy.get(".blog").eq(1).should("contain", "cypress test2");
      cy.get(".blog").eq(2).should("contain", "cypress test3");
    });

    it("sorted by amount of likes", function () {
      cy.get(".blog").eq(2).contains("view").click();
      cy.get(".blog").eq(2).contains("like").click();
      cy.get(".blog").eq(2).contains("like").click();
      cy.contains("sort by likes").click();
      cy.get(".blog").eq(0).contains("view").click();
      cy.contains("likes 2");
    });
  });
});
