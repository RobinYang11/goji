

# e9ui extendable ui

## Releases Notes 
### May 2024 (version 0.1.1)
- Rewrite the Form Component. Powered by [RobinYang](https://github.com/RobinYang11).

<!-- 
### 《Philosophy in React , frustrating Vue & Angular》

## Why e9ui?

- All UI library components hard to extend.

```tsx
  <Button icon={ <IconUser /> } type="primary">click me</Button>
```

![alt text](assets/image.png) -->

## Form Component 

### Form prop instructions
| name           | value                                         | description                                                                 |
| -------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| form           | FormInstance \| null                          | use  ``` Form.create()  ``` or ``` Form.useForm()``` to create FormInstance |
| onFinish       | ``` (value)=> void \| null ```                | Will excute  when form submit.                                              |
| onValuesChange | ``` (field,value,allFeild)=> void \| null ``` | Will excute  when any controlled field value changed.                       |

### Form.Item props
| name  | value        | description                                                                                                             |
| ----- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| name  | string?      | if  FormItem has 'name' props , The form will automatically inject the 'value' and ' onChange' to the children element. |
| label | string?      | display name of the field                                                                                               |
| rule  | FormItemRule? |  field rule  |
| renderChildren  | ({children})=> ReactElement | you can render the children by renderChildren  |


```tsx
interface BaseRuleInfo {
  message?: string;
  value?: any
  validator?: PromiseFunction<any>
}

type BaseRuleKey<T> = {
  [key: string]: T;
  email: T;
  phone: T;
  minLength: T;
  maxLength: T;
  atLeastOneUpperCase: T;
  noSpecialCharacters: T;
}

export type IFormItemRule = Partial<BaseRuleKey<BaseRuleInfo>>
```



### Example code

```typescript

import React, { useEffect } from "react";
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
          label={'name' + index}
          name={"name" + index}
        >
          <input />
        </FormItem>
      })
    }
    <FormItem
      label="测试原生input"
      name="t_name"
    >
      <input />
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
    
```