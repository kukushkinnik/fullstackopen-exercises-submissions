import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import AddNewBlogForm from "./AddNewBlogForm";

describe("New Blog Form component test", () => {
  test("The form calls event handler", () => {
    const addBlog = jest.fn();

    const component = render(<AddNewBlogForm addBlog={addBlog} />);

    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("form");

    fireEvent.change(title, {
      target: { value: "Test 1" },
    });

    fireEvent.change(author, {
      target: { value: "Test 1" },
    });

    fireEvent.change(url, {
      target: { value: "Test1.com" },
    });

    fireEvent.submit(form);
    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe("Test 1");
  });
});
