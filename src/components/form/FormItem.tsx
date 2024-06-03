import React, { HtmlHTMLAttributes, ReactElement, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormStore } from "./context";
import { getNearestForm } from "./util";
import { FormInstance, IFormItemRule } from "./form_instance";

export interface FormItemProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'name'> {
  name?: string;
  filter?: (value: any) => any;
  children: ReactElement;
  rule?: IFormItemRule;
  deps?: string[];
  label?: string;
  renderChilden?: (props: any) => any;
}

export default function FormItem(props: FormItemProps) {
  const { children, name, rule, deps, filter, renderChilden, label } = props;

  if (!name) {
    if (renderChilden) {
      return renderChilden(props);
    }
    return <div {...props}>{children}</div>
  }

  const {
    forms
  } = useContext(FormStore);

  const [force, forceRender] = useState();
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
    if (name) {
      form?.addField(name, {
        rule,
        value: null,
        deps: deps,
        filter,
        onChange: forceRender
      })
      forceRender(formId);
    }

  }, [parentRef.current])

  const change = (value: any) => {
    if (formRef.current) {
      const form: FormInstance = formRef.current;
      form.setValue(name, value?.target ? value.target.value : value);
    }
  }

  const child = useMemo(() => {
    if (!name) return children;

    const form = formRef.current;

    const copy = React.cloneElement(children, {
      value: form?.fields?.[name]?.value || '',
      onChange: change
    })

    if (renderChilden) {
      return renderChilden({
        ...props,
        children: copy,
      });
    }

    return copy;
  }, [
    formRef.current,
    formRef.current?.fields[name]?.value,
    formRef.current?.fields[name]?.error,
    force
  ])

  return (
    <div
      {...props}
      ref={parentRef}
    >
      <div>
        <span>{label}: </span>
        {child}
      </div>
      <div style={{ color: "red" }}>{formRef.current?.fields[name].error}</div>
    </div>
  );
}