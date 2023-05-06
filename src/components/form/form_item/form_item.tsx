import React from "react";
import { ReactElement } from "react";
import { Controller } from "react-hook-form";
import FlexItem from "../../flex_item/flex_item";
import Flex from "../../flex/flex";
import { IExtableProps } from "../../base_props";
import styles from "./form_item.module.less";
import { Box } from "../../../dom";

export interface FormItemProps extends IExtableProps {
  name: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rules?: any;
  form?: any;
  colLayout?: any;
}

export function FormItem(props: FormItemProps) {
  const { children, name, style, extSelector, extension, form, colLayout } =
    props;
  const {
    formState: { errors },
    control,
  } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const _copy = React.cloneElement(children as ReactElement, {
          ...field,
        });
        return (
          <Box
            className={styles.formItem}
            extSelector={extSelector}
            extension={extension}
          >
            <Flex alignItems="center" style={style}>
              <FlexItem
                style={{
                  textAlign: colLayout?.labelTextAlign,
                  padding: "0 6px",
                }}
                flex={colLayout?.labelCol || 3}
              >
                {name}
              </FlexItem>
              <FlexItem flex={colLayout?.contentCol || 16}>{_copy}</FlexItem>
            </Flex>
            <Flex>
              <FlexItem
                style={{
                  textAlign: colLayout?.labelTextAlign,
                }}
                flex={colLayout?.labelCol || 3}
              >
                {null}
              </FlexItem>
              <FlexItem flex={colLayout?.contentCol || 16}>
                <div className={styles.error}>
                  {errors?.[name] && errors?.[name].message}
                </div>
              </FlexItem>
            </Flex>
          </Box>
        );
      }}
    />
  );
}
