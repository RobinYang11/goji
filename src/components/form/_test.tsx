import React, { ReactHTMLElement, useEffect, useRef } from "react";
import FormItem from "./FormItem";
import Form from "./form";

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
          <span>
            <div>
              <p>
                <input />
              </p>
            </div>
          </span>
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
    <div>
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
    </div>
    <FormItem
      rules={[
        {
          type: 'email',
          message: 'please input a valid email',
        }
      ]}
      name="name"
    >
      <div>
        <MyInput defaultValue="myInputDefaultValue" />
      </div>
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
