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
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login_btn").click();
      cy.contains("new blog");
    });

    it("faild login", function () {
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
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login_btn").click();
    });

    it("when logged in, new blog can be created", function () {
      cy.get("#toggle_btn").click();
      cy.get("#title").type("cypress test");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress test");
      cy.get("#create_btn").click();
      cy.contains("a new blog was added");
    });

    it("logged in user can like a blog", function () {
      cy.get("#toggle_btn").click();
      cy.get("#title").type("cypress test");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress test");
      cy.get("#create_btn").click();
      cy.get("#viewHide_btn").click();
      cy.get("#like_btn").click();
      cy.contains("likes 1");
    });
  });
});
