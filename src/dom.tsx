import React, { useRef } from "react";
import { BaseProps } from "./components";
import useExtension from "./hooks";
import { IExtableProps } from "./components/base_props";

export function Box(props: IExtableProps) {
  const { extSelector, extension, children } = props;

  if (!extension || ! extSelector) return <div>{children}</div>;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const ext = useExtension<HTMLDivElement | null>(
    rootRef.current,
    extSelector,
    extension
  );

  return (
    <div ref={rootRef}>
      {ext}
      {children}
    </div>
  );
}

export function Inline(props:IExtableProps) {
  const { extSelector, extension, children } = props;

  if (!extension) return <div>{children}</div>;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const ext = useExtension<HTMLDivElement | null>(
    rootRef.current,
    extSelector,
    extension
  );

  return (
    <span ref={rootRef}>
      {ext}
      {children}
    </span>
  );
}




export function Div(props: BaseProps) {
  const { extSelector, extension, children } = props;

  const rootRef = useRef<HTMLDivElement | null>(null);

  const ext = useExtension<HTMLDivElement | null>(
    rootRef.current,
    extSelector,
    extension
  );

  return (
    <div ref={rootRef}>
      {ext}
      {children}
    </div>
  );
}

export function Span(props: BaseProps) {
  const { extSelector, extension, children } = props;

  const rootRef = useRef<HTMLSpanElement | null>(null);
  const ext = useExtension<HTMLSpanElement | null>(
    rootRef.current,
    extSelector,
    extension
  );

  return (
    <span ref={rootRef}>
      {ext}
      {children}
    </span>
  );
}
