import React, { ReactElement, ReactNode } from "react";
import { BaseProps } from "../base_props";
import styles from "./flex.module.less";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  style?: any;
  className?: string;
  itemSpace?: number | string;
  alignItems?: string;
  justify?: string;
}

export default function Flex(props: FlexProps) {
  const { children, style, className, alignItems, justify } = props;
  return (
    <div
      {...props}
      style={{
        alignItems,
        justifyContent: justify,
        ...style,
      }}
      className={`${styles.flex} ${className}`}
    >
      {children}
    </div>
  );
}
