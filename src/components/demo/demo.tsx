import React, { HTMLAttributes, HtmlHTMLAttributes, ReactElement, Ref, useContext, useEffect, useId, useRef, useState } from "react";

interface FormContextInterface {
  forms: Record<string, any>,
  allFormValues: Record<string, any>,
  setFormValues: (name: any[], value: any) => void,
  clearFormValues: () => void,
  removeFromValues: (name: string) => void
  update: (formId: string, value: any) => void,
  registerForm: (formId: string) => void
}

const FormStore = React.createContext<Readonly<FormContextInterface>>({
  forms: {},
  allFormValues: {},
  setFormValues: (name: any[], value: any) => { },
  clearFormValues: () => { },
  removeFromValues: (name: string) => { },
  update: (formId: string, value: any) => { },
  registerForm: (formId: string) => { }
});

interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {
  onValuesChange?: (values: Record<string, any>) => any;
  onFinish?: (values: Record<string, any>) => void;
  form?: FormInstance
}


type FormValues = Record<string, any>;

interface FormApi {
  getFieldsValue: () => FormValues,
  reset: () => void;
}

class FormInstance implements FormApi {
  registerApi = (v: any, setV: any) => {
    this.getFieldsValue = () => v;
    this.reset = () => {
      setV({});
    }
    this.setFieldsValue = () => {
      setV({ name: "robin" });
    }
  };
  setFieldsValue = () => { }
  getFieldsValue = () => { return {} };
  reset = () => { }
}

function Form(props: FormProps) {

  // const [data, setData] = useState({})


  const globalFormState: FormContextInterface = {
    forms: {},
    allFormValues: {},
    setFormValues(name: any[], value: string) {
      if (name?.length) {
        name.forEach((item, index) => {
          globalFormState.allFormValues[item] = value;
        })
        // console.log("value changed")
        // globalFormState.allFormValues[name] = value;
      }
    },
    clearFormValues() {
      // globalFormState.allFormValues
      Object.keys(globalFormState.allFormValues).forEach(key => {
        console.log("##", key)
        globalFormState.allFormValues[key] = undefined;
      })

    },
    removeFromValues(name: string) {
      delete this.allFormValues[name];
    },
    update(formId: string, value: any) {
      this.forms[formId] = value;
    },
    registerForm(formId: string) {
      this.forms[formId] = {};
    }
  }

  return <FormStore.Provider value={globalFormState}>
    <InnerForm {...props} />
  </FormStore.Provider>
}

function InnerForm(props: FormProps) {

  const {
    forms,
    allFormValues,
    clearFormValues,
    registerForm,
    setFormValues,
    update
  } = useContext(FormStore);

  const { form } = props;
  // unique form id;
  const formId = useId();

  // current form values 
  const [values, setValues] = useState<Record<string, any>>({});

  // register form to store
  // registerForm(formId);

  // console.log("##", ctx);
  // form?.registerApi(values, setValues);

  const valueFilters: Record<string, Function> = {};

  const filterValues = (values: Record<string, any>) => {
    const newValues = { ...values };
    Object.keys(newValues).forEach((key) => {
      if (valueFilters[key]) {
        newValues[key] = valueFilters[key](newValues[key]);
      }
    });
    return newValues;
  }

  const {
    children,
    onValuesChange,
    onFinish,
  } = props;

  return (
    <form
      onReset={(e) => {
        e.preventDefault();
        clearFormValues();
        // console.log("###", "onReset");
        // setFormValues('all', {});
      }}
      onSubmit={(e) => {
        // prevent default form submission
        e.preventDefault();
        console.log("finished", allFormValues)
        // onFinish?.(filterValues(values));
      }}
    >
      {children}
    </form>
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


  const formItemId = useId();
  console.log("formItemId", formItemId);

  const { allFormValues, setFormValues } = useContext(FormStore)
  const formName = `${formItemId}_${name}`;

  if (name) {
    const C = children;
    // const copy = React.cloneElement(children, {
    //   value: allFormValues[formName],
    //   onChange: (value: any) => {
    //     console.log("onChange", formName, value)
    //     setFormValues([formName], value?.target?.value || value);
    //   }
    // })

    return <div>
      <C value={allFormValues[formName]} />
      {/* {copy} */}
    </div>
  }

  return (
    <div>
      {/* {"ctx" + ctx[name]} */}
      {children}
    </div>
  );
}

function MyInput({ value, onChange, defaultValue }: any) {


  console.log("##", value)

  useEffect(() => {
    onChange?.(defaultValue);
  }, [defaultValue])

  return (<div>
    {value}
    <button
      type="button"
      onClick={() => {
        onChange && onChange('change Value')
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
      name="test"
    >
      <input />
    </FormItem>
    <FormItem name="name">
      <MyInput defaultValue="test" />
    </FormItem>
    <button type="reset"> reset</button>
    <button
      onClick={() => {
        // const v = form.getFieldsValue();
        form.setFieldsValue();
        // console.log("##v", v);
      }}
    >
      get Form instance
    </button>
    <button type="submit">submit</button>
  </Form>
}

