

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
   render(<div>
      {recursiveRender(<Comp />, addPropsCallback)}
    </div>);

  });

});