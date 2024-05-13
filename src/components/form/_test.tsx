import React, { ReactElement, ReactHTMLElement, useEffect, useRef, useState } from "react";
import FormItem from "./FormItem";
import Form from "./form";
import Button from "../button/button";
import { recursiveRender } from "./util";

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
      Array(2).fill(0).map((_, index) => {
        return <FormItem
          key={index}
          // className="formItem"
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
      // className="formItem"
      name="t_name"
    >
      <input />
    </FormItem>
    <div>
      <FormItem
        // className="formItem"
        name="sex"
      >
        <select>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
      </FormItem>
    </div>
    <FormItem name="test">
      <div>test</div>
      {/* <span></span>  */}
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


function TestMyRender({ children }: any) {
  // const e = <div>test</div>
  const start = Date.now();
  const end = Date.now()
  console.log(end - start)
  const [v, setV] = useState("myName")
  return <div>
    <input value={v} onChange={(e) => {
      setV(e.target.value);
    }} />
    {recursiveRender(children, (ele: any, props) => {
      // console.log(ele?.props, props)
      // console.log("##",ele)
      if (ele.type === 'input') {
        props = { value: v, onChange: (e: any) => { setV(e.target.value) } }
      }
      // props = { one: 1, two: 2, three: 3, four: 4, five: 5 }
      return props;
    })}
  </div>
}

export default function T() {

  return <TestMyRender>
    <div>
      <div>HELLO <span>ROBIN</span></div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <span>
                      <MyInput />
                    </span>
                    <div>
                      testName: <input />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TestMyRender>
}

