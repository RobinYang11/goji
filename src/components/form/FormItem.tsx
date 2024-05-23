import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormStore } from "./context";
import { getNearestForm } from "./util";
import { FormInstance } from "./form_instance";


// TODO: define rule map for rule ,every 'type' corresponding to
// a Function  which hanlde the validation
type BaseRuleType =
  | 'email'
  | 'phone' //  phone number
  | 'minlength' // minimum length
  | 'maxlength' // maximum length
  | 'RegExp' // regular expression
  | 'letterAndNumber' // contains letters and numbers
  | 'atLeastOneUppercase' // contains at least one uppercase letter
  | 'noSpecialCharacters' // contains no special characters
  | 'password'
  | 'website'; // a valid web url


const validateMap: Record<BaseRuleType, (value: any) => void> = {
  'phone': async (value) => {
    const phoneReg = /^[a-zA-Z0-9]/
  },
}

export interface ItemRule {
  message?: string;
  type?: BaseRuleType;
  validator?: (value:any) => Promise<any>
}

export interface FormItemProps {
  name: string
  valueFilter?: (value: any) => any
  children: ReactElement
  rules?: ItemRule[]
}

export default function FormItem({ children, name, rules }: FormItemProps) {

  if (!name) {
    return <div>{children}</div>
  }

  const {
    forms,
  } = useContext(FormStore);

  const [, forceRender] = useState();
  const formRef = useRef<FormInstance>();
  const parentRef = useRef<any>();

  useEffect(() => {

    const formId = getNearestForm(parentRef.current)
    const form = forms[formId]
    if (!form) return;
    formRef.current = form

    // if name and rules are specified, then register rules;
    if (rules && name) {
      form.rules[name] = rules;
      forceRender(formId);
    }

  }, [parentRef.current])

  const change = (value: any) => {
    if (formRef.current) {
      const form: FormInstance = formRef.current;
      form.setValue(name, value?.target?.value || value)
      // forceRender(value?.target?.value || value);
    }
  }

  const child = useMemo(() => {
    if (!name) return children;
    const form = formRef.current;
    return React.cloneElement(children, {
      value: form?.values?.[name] || '',
      onChange: change
    })
  }, [formRef.current, formRef.current?.values[name], formRef.current?.errors[name]])

  return (
    <div ref={parentRef}>
      {name}: {child}
      {
        formRef.current?.errors[name] ?
          <div style={{ color: "red" }}>errors:{formRef.current?.errors[name]}</div> : null
      }
    </div>
  );
}