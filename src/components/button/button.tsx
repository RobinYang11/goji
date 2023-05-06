import React, { ReactNode } from "react";
import styles from "./button.module.less";

interface IButtonProps extends Partial<React.HTMLProps<HTMLButtonElement>> {
  className?: string;
  bgColor?: string;
  color?: string;
  children: ReactNode;
}

export default function Button(props: IButtonProps) {
  return (
    <button
      className={`${styles.button} ${props.className}`}
      {...(props as any)}
      style={{
        ...props.style,
        background: props.bgColor,
        color: props.color,
      }}
    >
      {props.children}
    </button>
  );
}
