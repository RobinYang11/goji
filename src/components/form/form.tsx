import React, { HTMLAttributes, useContext, useState } from "react";
import { FormStore } from "./context";
import { useForm } from "./hooks";
import { FormInstance } from "./form_instance";


export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {
  onValuesChange?: (values: Record<string, any>) => any;
  onFinish?: (values: Record<string, any>) => void;
  form?: FormInstance
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
  return (
    <div>
      <form
        data-name={form?.name}
        onReset={(e) => {
          form.reset();
          updateForm(form.name, form)
        }}
        onSubmit={(e) => {
          console.log("##",form)
          onFinish?.(form.fields);
          // prevent default form submission
          e.preventDefault();
        }}
        {...props}
      >
        {children}
      </form>
    </div>
  );
}


Form.create = () => {
  return new FormInstance();
}




