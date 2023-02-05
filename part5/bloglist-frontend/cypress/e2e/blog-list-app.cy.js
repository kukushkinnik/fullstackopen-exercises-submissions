describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "test",
      name: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
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
  });
});
