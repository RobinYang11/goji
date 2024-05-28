import React, { HtmlHTMLAttributes, ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormStore } from "./context";
import { getNearestForm } from "./util";
import { FormInstance, IFormItemRule } from "./form_instance";

export interface FormItemProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'name'> {
  name?: string
  filter?: (value: any) => any
  children: ReactElement
  rule?: IFormItemRule,
  deps?: [string]
}

export default function FormItem(props: FormItemProps) {
  const { children, name, rule, deps, filter } = props;

  if (!name) {
    return <div {...props}>{children}</div>
  }

  const {
    forms
  } = useContext(FormStore);

  const [, forceRender] = useState();
  const formRef = useRef<FormInstance>();
  const parentRef = useRef<any>();

  useEffect(() => {

    const formId = getNearestForm(parentRef.current)
    const form = forms[formId]
    if (!form) {
      console.warn("FormItem with 'name' attribute must placed in Form")
      return;
    }
    formRef.current = form

    // if name and rules are specified, then register rules;
    if (rule && name) {
      // form.rules[name] = rule;
      form.addField(name, {
        rule,
        // value: value?.target?.value || value,
        deps: deps,
        filter,
        onChange: change
      })
      forceRender(formId);
    }

  }, [parentRef.current])

  const change = (value: any) => {
    if (formRef.current) {
      const form: FormInstance = formRef.current;
      forceRender(value?.target?.value || value);
      form.setValue(name, value?.target?.value || value);
      console.log(form.fields[name])
    }
  }

  const child = useMemo(() => {
    if (!name) return children;
    const form = formRef.current;

    if (formRef.current?.triggers !== undefined) {
      formRef.current!.triggers[name] = onchange
    }
    return React.cloneElement(children, {
      value: form?.values?.[name] || '',
      onChange: change
    })
  }, [
    formRef.current,
    formRef.current?.values[name],
    formRef.current?.errors[name],
  ])

  return (
    <div
      {...props}
      ref={parentRef}
    >
      <div>count:{formRef.current?.updateCount}</div>
      {name}: {child}
      {
        formRef.current?.errors[name] ?
          <div style={{ color: "red" }}>errors:{formRef.current?.errors[name]}</div> : null
      }
    </div>
  );
}