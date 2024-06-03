import React, { HTMLAttributes, useContext, useState } from "react";
import { FormStore } from "./context";
import { createForm, useForm } from "./hooks";
import { FormInstance } from "./form_instance";
import FormItem from "./FormItem";


export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {
  onValuesChange?: (key:any,values: any) => any;
  onFinish?: (values: Record<string, any>) => void;
  form?: FormInstance
}


function Form(props: FormProps) {

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
    form,
    onValuesChange
  } = props;

  const {
    updateForm
  } = useContext(FormStore);

  const formHooks = useForm(form)
  const formInstance = formHooks.form;

  if (!formInstance) return null;

  if (onValuesChange) {
    formInstance.onValuesChange = onValuesChange;
  }

  return (
    <div>
      <form
        data-name={formInstance?.name}
        id={formInstance?.name}
        onReset={(e) => {
          formInstance?.reset();
          updateForm(formInstance?.name, formInstance)
        }}
        onSubmit={(e) => {
          onFinish?.(formInstance?.fields);
          // prevent default form submission
          e.preventDefault();
        }}
      // {...props}
      >
        {children}
      </form>
    </div>
  );
}

Form.Item = FormItem;
Form.create = createForm;
export default Form;

