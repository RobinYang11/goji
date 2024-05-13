import React, { ReactElement, ReactNode } from "react";

/**
 * 
 * @param current
 * @returns 
 */
export const getNearestForm = (current: HTMLElement): any => {
  if (!current) return null;
  const name = current.dataset?.name
  if (name) {
    return name;
  }

  if (current.parentElement) {
    return getNearestForm(current.parentElement)
  }
}

/**
 * Recursively copy the current element,
 * while copying we can modify the element's props by callbacks
 * @param rootElement 
 * @param addPropsCallback
 */
export const recursiveRender = (rootElement: ReactNode,
  addPropsCallback: (copyingElement: ReactNode, props: {}) => Record<string, any>) => {

  return React.Children.map(rootElement, child => {

    let childProps: any = {};

    if (React.isValidElement(child)) {
      const newProps = addPropsCallback(child, childProps);
      childProps = newProps;
    }

    // String has no Props
    if (child?.props) {
      if (child.props.children !== undefined) {
        childProps.children = recursiveRender(child?.props?.children, addPropsCallback);
        return React.cloneElement(child, childProps);
      }
    }

    return child;

  })
}