import React, { useEffect } from "react";
import FormItem from "./FormItem";
import Form from "./Form";

function MyInput({ value, onChange, defaultValue }: any) {

  useEffect(() => {
    onChange?.(defaultValue);
  }, [defaultValue])

  return (<div style={{ border: '1px solid red' }}>
    {value || ''}
    <button
      type="button"
      onClick={() => {
        onChange && onChange(Math.random() + "");
      }}
    >
      click To change
    </button>
  </div>)
}


export function FormTest() {
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
      Array(10).fill(0).map((_, index) => {
        return <FormItem
          key={index}
          name={"name" + index}
        >
          <input />
        </FormItem>
      })
    }
    <FormItem
      // className="formItem"
      name="t_name"
    >
      <input />
    </FormItem>
    <FormItem
      name="text-area"
    >
      <textarea placeholder="input some text" />
    </FormItem>
    <div>
      <FormItem
        name="sex"
      >
        <select>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
      </FormItem>
    </div>

    <FormItem
      deps={['sex']}
      rule={{
        minLength: {
          value: 10,
          message: "最aa"
        },
        maxLength: {
          value: 100
        },
        other: {
          message: "custom validation rule",
          validator: (value: any, rule) => {
            console.log(value, rule)
            return Promise.reject("custom validation rule");
          }
        },
      }}
      name="name"
    >
      <MyInput defaultValue="myInputDefaultValue" />
    </FormItem>
    <FormItem
      rule={{
        myRule:{
          validator:()=>{
            return Promise.reject("custom validation rule");
          }
        }
      }}
      name="abc"
      renderChilden={(props) => {
        const { children } = props
        // console.log(props)
        const field =  form.fields["abc"];
        console.log(field)
        return <div>
          <span>自定义渲染:</span>
          {children}
        </div>
      }}>
      <input />
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
