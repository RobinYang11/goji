import React, { HTMLAttributes, HtmlHTMLAttributes, ReactElement, Ref, useContext, useEffect, useId, useMemo, useRef, useState } from "react";

interface FormContextInterface {

  name: string,
  forms: Record<string, any>,
  allFormValues: Record<string, any>,
  setFormValues: (name: any[], value: any) => void,
  clearFormValues: () => void,
  removeFromValues: (name: string) => void
  update: (formId: string, value: any) => void,
  registerForm: (formId: string) => void
}

const FormStore = React.createContext<FormContextInterface>({
  name: 'test',
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
    name: "StoreName",
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
    <button onClick={() => {
      globalFormState.name = "changeName"
    }}>change store</button>
    <InnerForm {...props} />
  </FormStore.Provider>
}

function InnerForm(props: FormProps) {

  const {
    name,
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

  console.log("chilren", children)


  return (
    <div>
      {/* <p>{name}</p> */}

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
        <div>form content</div>
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


  const formItemId = useId();
  console.log("formItemId", formItemId);

  const [, forceRender] = useState<any>();

  const { allFormValues, setFormValues } = useContext(FormStore)
  const formName = `${formItemId}_${name}`;

  useEffect(() => {
    console.log("value Change", allFormValues[formName]);
  }, [allFormValues[formName]])


  const ref = useRef<any>();
  const [v, setV] = useState();

  const change = (value: any) => {
    // console.log("onChange", formName, value)
    setFormValues([formName], value?.target?.value || value);
    setV(value?.target?.value || value);
    // forceRender(null);
  }

  if (name) {
    if (!ref.current) {
      ref.current = React.cloneElement(children, {
        value: v,
        onChange: change
      })
    } else {
      // change(allFormValues?.[formName]);
    }
  }





  return (
    <div>
      {name ? ref?.current : children}
    </div>
  );
}

function MyInput({ value, onChange, defaultValue }: any) {

  // console.log("vvv", value)
  // useEffect(() => {
  //   onChange?.(defaultValue);
  // }, [defaultValue])

  return (<div style={{ border: '1px solid red' }}>
    {value}
    {/* {defaultValue} */}
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
      name="t_name"
    >
      <input />
    </FormItem>
    <FormItem name="name">
      <MyInput defaultValue="myInputDefaultValue" />
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

