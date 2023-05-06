import React, { ReactNode } from "react";
import { Box } from "../../dom";
import { IExtableProps } from "../base_props";
import styles from "./input.module.less";

type tempProps = Omit<React.HTMLProps<HTMLInputElement>, "prefix" | "class">;

interface InputProps extends tempProps {
  onChange?(e: any): void;
  onBlur?(): void;
  prefix?(value: unknown, onChange?: (value: any) => void): ReactNode;
  suffix?(value: unknown, onChange?: (value: any) => void): ReactNode;
  value?: any;
}

export default function Input(props: InputProps) {
  return (
    <div tabIndex={2} className={styles.input}>
      {props.prefix ? (
        <span>{props?.prefix(props?.value, props?.onChange)}</span>
      ) : null}

      <input
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.suffix ? (
        <span>{props.suffix(props.value, props.onChange)}</span>
      ) : null}
    </div>
  );
}
