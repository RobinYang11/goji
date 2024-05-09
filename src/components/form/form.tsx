import React, { HTMLAttributes, HtmlHTMLAttributes, LegacyRef, ReactElement, Ref, useContext, useEffect, useId, useMemo, useRef, useState } from "react";

export interface IFormStore {
  forms: Record<string, FormInstance | undefined>,
  registerForm: (formName: string, form: FormInstance) => void,
  uninstallForm: (formName: string) => void
  updateForm: (formName: string, form: FormInstance) => void
}

export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {
  onValuesChange?: (values: Record<string, any>) => any;
  onFinish?: (values: Record<string, any>) => void;
  form?: FormInstance
}


export type FormValues = Record<string, any>;

export abstract class IForm {

  values: FormValues = {}

  rules: Record<string, any> = {}

  errors: Record<string, any> = {}

  reset(): void { }

  submit(): void { }

  validate(): void { }

  validateField(fieldName: string): string {



    return 'error'
  }

  reRender(): void { }


}

class FormInstance implements IForm {
  values: FormValues = {}
  errors: Record<string, any> = {};
  rules: Record<string, ItemRule[]> = {}
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

  validateField(fieldName: string): string {
    const rules = this.rules[fieldName]
    const value = this.values[fieldName];
    rules.map(rule => {
      // rule.type = 
    })
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


const FormStore = React.createContext<IFormStore>({
  forms: {},
  registerForm: (fromName: string, form: FormInstance) => { },
  uninstallForm: (formName: string) => { },
  updateForm: (formName: string, form: FormInstance) => { }
});


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
    registerForm,
    uninstallForm,
    updateForm
  } = useContext(FormStore);

  const {
    onFinish,
  } = props;
  // unique form id;
  const formId = useId();


  const {
    children,
  } = props;

  const formRef = useRef<any>();
  useEffect(() => {
    if (!formRef.current) {
      const formInstance = new FormInstance();
      registerForm(formId, formInstance);
      formRef.current = formInstance;
    }

    return () => { uninstallForm(formId); }
  }, [])


  return (
    <div>
      <form
        id={formId}
        onReset={(e) => {
          formRef.current.values = {};
          updateForm(formId, formRef.current)
        }}
        onSubmit={(e) => {
          // prevent default form submission
          e.preventDefault();
          onFinish?.(formRef.current.values);
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

// TODO: define rule map for rule ,every 'type' corresponding to
// a Function  which hanlde the validation
type BaseRuleType = 'email'
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
  message?: string,
  type?: BaseRuleType,
  ruleValue?: string | number | RegExp,
  validator?: (value: any) => void
}


interface FormItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string
  valueFilter?: (value: any) => any
  children: ReactElement,
  rules?: ItemRule[]
}

function FormItem({ children, name, rules }: FormItemProps) {

  const {
    forms,
  } = useContext(FormStore);

  const [, forceRender] = useState();

  const copyRef = useRef<ReactElement>();
  const formRef = useRef<FormInstance>();
  const parentRef = useRef<any>();
  const formId = parentRef.current?.parentElement?.id;

  if (formId && !formRef.current) {
    formRef.current = forms[formId];
  }

  const change = (value: any) => {
    if (formRef.current) {
      const form: FormInstance = formRef.current;
      form.values[name] = value?.target?.value || value;
      forceRender(value?.target?.value || value);
    }
  }

  if (name && formRef.current) {
    const form = formRef.current;
    copyRef.current = React.cloneElement(children, {
      value: form.values?.[name] || '',
      onChange: change
    })
  }

  useEffect(() => {
    if (formRef.current) {
      const form = formRef.current;
      if (rules) {
        form.rules[formId] = rules;
      }
    }
  }, [])

  return (
    <div ref={parentRef}>
      {name}: {name ? copyRef?.current : children}
      <p>errors:{ }</p>
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
    {
      Array(2).fill(0).map((_, index) => {
        return <FormItem
          key={index}
          className="formItem"
          name={"name" + index}
        >
          <input />
        </FormItem>
      })
    }
    <FormItem
      valueFilter={(value) => "filter" + value}
      className="formItem"
      name="t_name"
    >
      <input />
    </FormItem>
    <FormItem
      className="formItem"
      name="sex"
    >
      <select>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
    </FormItem>
    <FormItem
      rules={[
        {
          type: 'email',
          message: 'please input a valid email',
        }
      ]}
      name="name"
    >
      <MyInput defaultValue="myInputDefaultValue" />
    </FormItem>
    <button type="reset"> reset</button>
    <button
      onClick={() => { }}
    >
      get Form instance
    </button>
    <button type="submit">submit</button>
  </Form>
}

