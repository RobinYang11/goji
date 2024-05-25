import React, { HtmlHTMLAttributes, ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormStore } from "./context";
import { getNearestForm } from "./util";
import { FormInstance, IFormItemRule } from "./form_instance";

export interface FormItemProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'name'> {
  name?: string
  valueFilter?: (value: any) => any
  children: ReactElement
  rule?: IFormItemRule
}

export default function FormItem(props: FormItemProps) {
  const { children, name, rule } = props;

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
    if (rule && name) {
      form.rules[name] = rule;
      forceRender(formId);
    }

  }, [parentRef.current])

  const change = (value: any) => {
    if (formRef.current) {
      const form: FormInstance = formRef.current;
      forceRender(value?.target?.value || value);
      form.setValue(name, value?.target?.value || value, (v) => {
        forceRender(v);
      })
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
    <div
      {...props}
      ref={parentRef}
    >
      {name}: {child}
      {
        formRef.current?.errors[name] ?
          <div style={{ color: "red" }}>errors:{formRef.current?.errors[name]}</div> : null
      }
    </div>
  );
}