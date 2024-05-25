import { HtmlHTMLAttributes, ReactElement } from "react";

interface CenterProps extends Omit<HtmlHTMLAttributes<HTMLElement>, 'test'> {
  align: "vertical" | "horizontal" | "all",
  children: ReactElement
}

export function Center(props: CenterProps) {
  return <div {...props}>
    {props.children}
  </div>
}
