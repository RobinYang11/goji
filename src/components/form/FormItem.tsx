import React, { HtmlHTMLAttributes, JSXElementConstructor, ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormStore } from "./context";
import { FormInstance } from "./form";
import { getNearestForm, recursiveRender } from "./util";


// TODO: define rule map for rule ,every 'type' corresponding to
// a Function  which hanlde the validation
type BaseRuleType = 'email'
  | 'phone' //  phone number
  | 'minlength' // minimum length
  | 'maxlength' // maximum length
  | 'RegExp' // regular expression
  | 'letterAndNumber' // contains letters and numbers
  | 'atLeastOneUppercase' // contains at least one uppercase letter
  | 'noSpecialCharacters' // contains no special characters
  | 'password'
  | 'website'; // a valid web url


// const validateMap: Record<BaseRuleType, (value: any) => void> = {
//   'phone': async (value) => {
//     const phoneReg = /^[a-zA-Z0-9]/
//   },
// }


export interface ItemRule {
  message?: string,
  type?: BaseRuleType,
  ruleValue?: string | number | RegExp,
  validator?: (value: any) => void
}


interface IFormItemChildProps {
  value: any,
  onChange: (value: any) => void,
  defaultValue: any,
}

export interface FormItemProps {
  name: string
  valueFilter?: (value: any) => any
  children: ReactElement
  rules?: ItemRule[]
}


export default function FormItem({ children, name, rules }: FormItemProps) {

  const {
    forms,
  } = useContext(FormStore);

  const [, forceRender] = useState();
  const formRef = useRef<FormInstance>();
  const parentRef = useRef<any>();

  useEffect(() => {
    const formId = getNearestForm(parentRef.current)
    if (formId) {
      formRef.current = forms[formId];
      forceRender(formId);
    }
  }, [parentRef.current])

  const change = (value: any) => {
    console.log("###",value.target.value);
    if (formRef.current) {
      const form: FormInstance = formRef.current;
      form.values[name] = value?.target?.value || value;
      forceRender(value?.target?.value || value);
    }
  }

  const c = () => {
    if (!formRef.current) return null;
    const form = formRef.current;
    return recursiveRender(children, (ele: any) => {
      // console.log("##",ele.type)
      if (ele.type === 'input' || ele.type === 'select' || ele.type === 'textarea') {
        return {
          value: form.values?.[name] || '',
          onChange: change
        }
      }
      return {}
    })
  }


  return (
    <div ref={parentRef}>
      {name}: {c()}
      <p>errors:{ }</p>
    </div>
  );
}