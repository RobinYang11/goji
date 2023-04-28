import React, { useId } from "react";
import { ReactElement } from "react";
import { Controller } from "react-hook-form";
import FlexItem from "../../flex_item/flex_item";
import Flex from "../../flex/flex";
import { IExtableProps } from "../../base_props";
import { Box } from "../../../dom";

export interface FormItemProps extends IExtableProps {
  name: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rules?: [];
  onChange?: (value: unknown) => void;
  onBlur?: (value: unknown) => void;
  ref?: any;
  control?: any;
}

export function FormItem(props: FormItemProps) {
  const id = useId();
  console.log("ID", id);
  const {
    children,
    name,
    style,
    onChange,
    onBlur,
    control,
    extSelector,
    extension,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const _copy = React.cloneElement(children as ReactElement, {
          ...field,
        });
        return (
          <Box extSelector="abc" extension={extension}>
            <Flex style={style}>
              <FlexItem span={2}>{name}</FlexItem>
              <FlexItem>{_copy}</FlexItem>
            </Flex>
          </Box>
        );
      }}
    ></Controller>
  );
}
