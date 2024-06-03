// import { Form } from "e9ui";
import React, { useEffect } from "react";
// import FormItem from "./FormItem";
import Form from "./form";
import Upload from "../upload/upload";
import CheckBox from "../checkbox/CheckBox";

const FormItem = Form.Item;

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
    onValuesChange={(k, v) => {
      console.log("onValuesChange", k, v);
    }}
  >
    <div>test</div>
    {
      Array(10).fill(0).map((_, index) => {
        return <FormItem
          key={index}
          label={'name' + index}
          name={"name" + index}
        >
          <input />
        </FormItem>
      })
    }
    <FormItem
      // className="formItem"
      label="测试原生input"
      name="t_name"
    >
      <input />
    </FormItem>
    <FormItem
      label="测试原生上传文件"
      name="upload"
    >
      <input type="file" />
    </FormItem>
    <FormItem
      label="测试自定义上传文件"
      name="upload"
    >
      <Upload uploadUrl="">点击上传</Upload>
    </FormItem>

    <FormItem
      label="测试原生radios"
      name="radio"
    >
      <CheckBox.Group >
        <CheckBox value="male" label="male" />
        <CheckBox value="female" label="female" />
        <CheckBox value="other" label="other" />
      </CheckBox.Group>
    </FormItem>
    <FormItem
      name="text-area"
      label="测试 textarea"
    >
      <textarea placeholder="input some text" />
    </FormItem>
    <div>
      <FormItem
        name="sex"
        label="性别"
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
      label="测试自定义input"
    >
      <MyInput defaultValue="myInputDefaultValue" />
    </FormItem>
    <FormItem
      rule={{
        myRule: {
          validator: () => {
            return Promise.reject("custom validation rule");
          }
        }
      }}
      name="abc"
      deps={['sex', 't_name']}
      renderChilden={(props) => {
        const { children } = props
        console.log("deps on [sex] field", form.fields['sex']?.value)
        console.log("deps on [t_name] field", form.fields['t_name']?.value)
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
