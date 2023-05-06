import React, { ReactNode } from "react";

interface FlexItemProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** flex item   */
  /** css flex-basis property */
  flex?: string | number;
}

export default function FlexItem({
  children,
  className,
  style,
  flex,
}: FlexItemProps) {
  return (
    <div
      className={className}
      style={{
        flex: `0 0 ${flex}`,
        ...style,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
