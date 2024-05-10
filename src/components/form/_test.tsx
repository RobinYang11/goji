import React, { ReactElement, ReactHTMLElement, useEffect, useRef } from "react";
import FormItem from "./FormItem";
import Form from "./form";
import Button from "../button/button";

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


function FormTest() {
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
  const a= () => {
    const abc = (ele: ReactElement) => {
      if (!ele) return;
      if(Array.isArray(ele)){
        ele.forEach(item => {
          abc(item)
        })
        return;
      }

      console.log(ele.type)
      abc(ele.props?.children)
    }
    abc(children)
  }
  const start = Date.now();
  a();
  const end = Date.now()
  console.log(end-start)
  return <div>
    {children}
  </div>
}

export default function T() {

  return <TestMyRender>
    <div>
      <div>test</div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div><span>
                    <MyInput />
                  </span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TestMyRender>
}