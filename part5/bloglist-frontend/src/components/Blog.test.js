import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("Blog component test", () => {
  const blog = {
    title: "test",
    author: "test",
    url: "test.com",
  };

  const name = "test";

  const mockupDeleteBlog = jest.fn();
  const mockupHandleLikes = jest.fn();

  test("renders only title and author", () => {
    const component = render(
      <Blog
        blog={blog}
        name={name}
        deleteBlog={mockupDeleteBlog}
        handleLikes={mockupHandleLikes}
      />
    );
    expect(component.container).toHaveTextContent("test test");
  });

  test("clicking the view button displays url and likes", async () => {
    const component = render(
      <Blog
        blog={blog}
        name={name}
        deleteBlog={mockupDeleteBlog}
        handleLikes={mockupHandleLikes}
      />
    );
    const button = component.getByText("view");
    await fireEvent.click(button);

    expect(component.container).toHaveTextContent("test.com");
    expect(component.container).toHaveTextContent("likes");
  });

  test("clicking the like button twice updates likes two times", async () => {
    const component = render(
      <Blog
        blog={blog}
        name={name}
        deleteBlog={mockupDeleteBlog}
        handleLikes={mockupHandleLikes}
      />
    );
    const button = component.getByText("like");
    await fireEvent.click(button);
    await fireEvent.click(button);

    expect(mockupHandleLikes.mock.calls).toHaveLength(2);
  });
});
