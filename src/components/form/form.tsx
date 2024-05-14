import React, { HTMLAttributes, HtmlHTMLAttributes, LegacyRef, ReactElement, Ref, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { FormStore } from "./context";
import { ItemRule } from "./FormItem";
import { useForm } from "./hooks";

export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {
  onValuesChange?: (values: Record<string, any>) => any;
  onFinish?: (values: Record<string, any>) => void;
  form?: FormInstance
}


export type FormValues = Record<string, any>;

export class FormInstance {
  name: string = ''
  values: FormValues = {}
  errors: Record<string, any> = {};
  rules: Record<string, ItemRule[]> = {}
  valueFilters: Record<string, Function> = {};

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  filterValues(values: Record<string, any>) {
    const newValues = { ...values };
    Object.keys(newValues).forEach((key) => {
      if (this.valueFilters[key]) {
        newValues[key] = this.valueFilters[key](newValues[key]);
      }
    });
    return newValues;
  }

  validateField(fieldName: string): string {
    const rules = this.rules[fieldName]
    const value = this.values[fieldName];
    

    if (Math.random() * 10 > 5) {
      this.errors[fieldName] = `${fieldName} error`
    } else {
      this.errors[fieldName] = null
    }
    return "error"
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }
  submit(): void {
    throw new Error("Method not implemented.");
  }
  validate(): void {
    this.rules.map
    // throw new Error("Method not implemented.");
  }
  reRender(): void {
    throw new Error("Method not implemented.");
  }

}



export default function Form(props: FormProps) {


  const [forms, setForms] = useState<Record<string, FormInstance | undefined>>({});

  const registerForm = (formName: string, form: FormInstance) => {
    setForms({
      ...forms,
      [formName]: form
    })
  };

  const uninstallForm = (formName: string) => {
    setForms({
      ...forms,
      [formName]: undefined
    })
  }

  const updateForm = (formName: string, form: FormInstance) => {
    forms[formName] = form;
    setForms({
      ...forms,
    })
  }


  return <FormStore.Provider value={{ forms: forms, registerForm, uninstallForm, updateForm }}>
    <InnerForm {...props} />
  </FormStore.Provider>
}

function InnerForm(props: FormProps) {

  const {
    children,
    onFinish,
  } = props;

  const {
    updateForm
  } = useContext(FormStore);

  const { form } = useForm()

  if (!form) return null;
  console.log("formName", form.name)

  return (
    <div>
      <form
        data-name={form?.name}
        onReset={(e) => {
          form.values = {};
          updateForm(form.name, form)
        }}
        onSubmit={(e) => {
          // prevent default form submission
          e.preventDefault();
          onFinish?.(form.values);
        }}
      >
        {children}
      </form>
    </div>
  );
}


Form.create = () => {
  return new FormInstance();
}




