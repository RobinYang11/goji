

import React from "react";
import { render } from "@testing-library/react";
import { recursiveRender } from "../util";

// Mock the addPropsCallback function
const addPropsCallback = jest.fn((copyingElement, props) => {
  // Add your custom logic here
  return { ...props, customProp: "test" };
});

describe("recursiveRender function", () => {
  test("renders a single element with custom props", () => {
    const Comp = () => {
      return <div>
        <input />
      </div>
    }
    const { getByText } = render(<div>
      {recursiveRender(<Comp />, addPropsCallback)}
    </div>);
    const renderedElement = getByText(/Hello, World!/i);
    // expect(renderedElement).toHaveAttribute("customProp", "test");
  });

  // test("renders nested elements with custom props", () => {
  //   const element = (
  //     <div>
  //       <h1>Title</h1>
  //       <p>Content</p>
  //     </div>
  //   );
  //   const { getByText } = render(recursiveRender(element, addPropsCallback));
  //   const titleElement = getByText(/Title/i);
  //   const contentElement = getByText(/Content/i);
  //   expect(titleElement).toHaveAttribute("customProp", "test");
  //   expect(contentElement).toHaveAttribute("customProp", "test");
  // });

  // test("does not modify string children", () => {
  //   const element = <div>Hello, World!</div>;
  //   const { getByText } = render(recursiveRender(element, addPropsCallback));
  //   const renderedElement = getByText(/Hello, World!/i);
  //   expect(renderedElement.textContent).toBe("Hello, World!");
  // });

  // test("handles null or undefined elements", () => {
  //   const element = null;
  //   const result = recursiveRender(element, addPropsCallback);
  //   expect(result).toBeNull();
  // });

  // test("handles empty children", () => {
  //   const element = <div></div>;
  //   const { container } = render(recursiveRender(element, addPropsCallback));
  //   // expect(container.firstChild).toBeEmptyDOMElement();
  // });
});