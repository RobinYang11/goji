import React, { ReactElement, ReactNode } from "react";
import { useForm } from "react-hook-form";
import Flex from "../flex/flex";
import FlexItem from "../flex_item/flex_item";

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
  children: any;
  labelCol?: number;
  contentCol: number;
}

export default function Form({ children, onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const res = children?.map((i: ReactElement) => {
    return React.cloneElement(i, {
      ...register(i.props.name),
      key: i.props.name,
    });
  });

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        onSubmit?.(data);
      })}
    >
      {res}
    </form>
  );
}

interface FormItemProps {
  children: ReactElement;
  name: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rules?: [];
}

export function FormItem({ children, name, style }: FormItemProps) {
  return (
    <Flex style={style}>
      <FlexItem span={2}>label</FlexItem>
      <FlexItem>{children}</FlexItem>
    </Flex>
  );
}
