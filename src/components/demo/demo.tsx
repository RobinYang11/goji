import React, { HTMLAttributes, HtmlHTMLAttributes, ReactElement, Ref, useContext, useEffect, useId, useMemo, useRef, useState } from "react";

interface FormContextInterface {

  forms: Record<string, any>,
  allFormValues: Record<string, any>,
  setFormValues: (name: any[], value: any) => void,
  clearFormValues: () => void,
  removeFromValues: (name: string) => void
  update: (formId: string, value: any) => void,
  registerForm: (formId: string) => void
}


interface IFormStore {
  forms: Record<string, FormInstance | undefined>,
  registerForm: (formName: string, form: FormInstance) => void,
  uninstallForm: (formName: string) => void
}

const FormStore = React.createContext<IFormStore>({
  forms: {},
  registerForm: (fromName: string, form: FormInstance) => { },
  uninstallForm: (formName: string) => { }
});

interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {
  onValuesChange?: (values: Record<string, any>) => any;
  onFinish?: (values: Record<string, any>) => void;
  form?: FormInstance
}


type FormValues = Record<string, any>;

abstract class IForm {

  values: FormValues = {}

  rules: Record<string, any> = {}

  errors: Record<string, any> = {}

  reset(): void { }

  submit(): void { }

  validate(): void { }

  reRender(): void { }


}

class FormInstance implements IForm {
  values: FormValues = {}
  errors: Record<string, any> = {};
  rules: Record<string, Function | string | RegExp> = {}
  valueFilters: Record<string, Function> = {};

  constructor() {

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

  reset(): void {
    throw new Error("Method not implemented.");
  }
  submit(): void {
    throw new Error("Method not implemented.");
  }
  validate(): void {
    throw new Error("Method not implemented.");
  }
  reRender(): void {
    throw new Error("Method not implemented.");
  }

}

function Form(props: FormProps) {


  const [forms, setForms] = useState<Record<string, FormInstance | undefined>>({});

  const registerForm = (formName: string, form: FormInstance) => {
    console.log("registerForm", formName, form)
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


  return <FormStore.Provider value={{ forms: forms, registerForm, uninstallForm }}>
    <InnerForm {...props} />
  </FormStore.Provider>
}

function InnerForm(props: FormProps) {

  const {
    registerForm,
    uninstallForm
  } = useContext(FormStore);

  // const { form } = props;
  // unique form id;
  const formId = useId();


  const {
    children,
  } = props;

  useEffect(() => {
    const formInstance = new FormInstance();
    registerForm(formId, formInstance);
    return () => { uninstallForm(formId); }
  }, [])

  return (
    <div>
      <form
        id={formId}
        onReset={(e) => {
          // prevent default reset
          e.preventDefault();

        }}
        onSubmit={(e) => {
          // prevent default form submission
          e.preventDefault();
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

interface FormItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string
  valueFilter?: (value: any) => any
  children: ReactElement
}

function FormItem({ children, name }: FormItemProps) {

  const {
    forms
  } = useContext(FormStore);


  const [, forceRender] = useState();

  const ref = useRef<any>();
  const formRef = useRef<any>();


  const change = (value: any) => {
    // setFormValues([formName], value?.target?.value || value);
    forceRender(value?.target?.value || value);
  }


  if (name) {
    ref.current = React.cloneElement(children, {
      // value: allFormValues[formName] || '',
      onChange: change
    })
  }

  useEffect(() => {
    if (!ref.current || !name) return;
    const formId = ref.current?.parentElement?.id;
    formRef.current = forms[formId];
    console.log("## form instance ##", formId,forms)
  }, [])



  return (
    <div ref={ref}>
      {name ? ref?.current : children}
    </div>
  );
}

function MyInput({ value, onChange, defaultValue }: any) {

  useEffect(() => {
    onChange?.(defaultValue);
  }, [defaultValue])

  return (<div style={{ border: '1px solid red' }}>
    {value || ''}
    <button
      type="button"
      onClick={() => {
        onChange && onChange(Math.random());
      }}
    >
      click To change
    </button>
  </div>)
}

export default function FormTest() {
  const form = Form.create();
  return <Form
    form={form}
    onFinish={v => {
      console.log("finishValues", v)
    }}
    onValuesChange={v => {
      console.log("onValuesChange", v);
    }}
  >
    <div>test</div>
    <FormItem
      valueFilter={(value) => "filter" + value}
      className="formItem"
      name="t_name"
    >
      <input />
    </FormItem>
    <FormItem name="name">
      <MyInput defaultValue="myInputDefaultValue" />
    </FormItem>
    <button type="reset"> reset</button>
    <button
      onClick={() => {}}
    >
      get Form instance
    </button>
    <button type="submit">submit</button>
  </Form>
}

