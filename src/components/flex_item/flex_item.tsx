import React, { ReactNode } from "react";

interface FlexItemProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** flex item   */
  perc?: null;
  /** css flex property */
  flex?: string | number;
}

export default function FlexItem({
  children,
  className,
  style,
  perc,
  flex,
}: FlexItemProps) {
  const percStyle = perc
    ? {
        flexBasis: (perc / 24) * 100,
      }
    : {};

  return (
    <div
      className={className}
      style={{
        flex,
        // ...percStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
