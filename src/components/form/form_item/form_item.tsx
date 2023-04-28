import React, { useId } from "react";
import { ReactElement } from "react";
import { Controller } from "react-hook-form";
import FlexItem from "../../flex_item/flex_item";
import Flex from "../../flex/flex";
import { IExtableProps } from "../../base_props";
import { Box } from "../../../dom";
import { compose } from "../../../util";
// import { compose } from "../../../util";


type RuleType ={
  required:boolean;
  max:number;  
  min:number;
  reg:RegExp;
  phone:RegExp;
  email:boolean;
  validator: ()=>{}
}

export interface IFormItemRule{
  type:keyof RuleType;
  rule?:any;
  message?:string; 
}

export interface FormItemProps extends IExtableProps {
  name: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rules?: Array<IFormItemRule>;
  onChange?: (value: unknown) => void;
  onBlur?: (value: unknown) => void;
  ref?: any;
  control?: any;
}

export function FormItem(props: FormItemProps) {
  const id = useId();
  const {
    children,
    name,
    style,
    onChange,
    onBlur,
    control,
    extSelector,
    extension,
    rules
  } = props;
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if(rules){
          var rs =compose(rules?.map(()=>{
            return ()=>{
              return Promise.resolve("hello");
            } 
          }))
          rs("test",()=>{})
        }
        if(rules) {
          rules?.forEach(i=>{
            if(i.type==="max"){
              return Promise.reject("")  
            }
          })
          // compose(rules)
          // compose(rules)
        } 
        const _copy = React.cloneElement(children as ReactElement, {
          ...field,
        });
        return (
          <Box extSelector={extSelector} extension={extension}>
            <Flex style={style}>
              <FlexItem span={2}>{name}</FlexItem>
              <FlexItem>{_copy}</FlexItem>
            </Flex>
            {/* <div>{}</div> */}
          </Box>
        );
      }}
    />
  );
}
