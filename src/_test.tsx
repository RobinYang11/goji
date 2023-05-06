import React, { useState } from "react";
import ReactDom, { createPortal } from "react-dom";

// import * as GOJI from "goji_ui";
// import Input from "./components/input";
import Table from "./components/table/table";
import Upload from "./components/upload/upload";
import Form from "./components/form/form";
import { Controller, useForm } from "react-hook-form";
import { FormItem } from "./components/form/form_item/form_item";
import Input from "./components/input/input";
import Button from "./components/button/button";
// import Input from "./components/input";

// function Input(props: any) {
//   return (
//     <div>
//       <input
//         {...props}
//         value={props?.value || ""}
//         // ### dev.log1
//         // Warning: A component is changing an uncontrolled input to be controlled.
//         // This is likely caused by the value changing from undefined to a defined value,
//         // which should not happen.
//         // Decide between using a controlled or uncontrolled input element for the lifetime of the component.
//         //More info: https://reactjs.org/link/controlled-components
//       />
//     </div>
//   );
// }

function CustomForm({ value, onChange }: any) {
  return (
    <div>
      <span>{value}</span>
      <button
        onClick={() => {
          onChange("test");
        }}
      >
        change
      </button>
    </div>
  );
}

function App() {
  const [visible, setVisible] = useState(false);

  const form = useForm();
  const { reset } = form;
  return (
    <div>
      <Form
        colLayout={{
          labelCol: "100px",
          contentCol: 1,
          labelTextAlign: "right",
        }}
        form={form}
        onSubmit={(data) => {
          console.log("##data", data);
        }}
      >
        <FormItem name="cc">
          <Input
            suffix={(value: any, onChange: any) => {
              return (
                <span
                  onClick={(e) => {
                    onChange("test");
                  }}
                >
                  test
                </span>
              );
            }}
            prefix={(value: any) => {
              return <span>{value}</span>;
            }}
          />
        </FormItem>
        <FormItem name="abc">
          <CustomForm />
        </FormItem>
        <FormItem
          rules={{
            required: {
              value: true,
              message: "must be a number",
            },
            maxLength: {
              value: 5,
              message: "max 5",
            },
          }}
          name="test"
        >
          <Input />
        </FormItem>
        <FormItem name="name">
          <Input
            prefix={(value: any, onChange) => {
              return <span>{value?.length || 0} /50</span>;
            }}
          />
        </FormItem>
        <FormItem name="age" extension={<span>TEST</span>} extSelector="">
          <Input />
        </FormItem>
        <FormItem name="salary" extension={<span>TEST</span>} extSelector="">
          <Input />
          {/* <Input /> */}
        </FormItem>
        <button>test</button>
        <Button
          bgColor="#383da6"
          color="white"
          onClick={() => {
            console.log("hell robin");
            // alert("hello robin");
          }}
          type="button"
        >
          official button
        </Button>
        <button
          onClick={() => {
            reset();
          }}
        >
          reset
        </button>
      </Form>
      {/* <Upload urlFilter={(v: any) => v?.url} uploadUrl="/api/upload">
        上传
      </Upload>
      <Table
        data={[
          {
            id: "k6k2",
            name: "name",
            age: 3,
          },
        ]}
        cols={[
          { key: "name", title: "名称" },
          { key: "id", title: "ID" },
          { key: "age", title: "年龄" },
          {
            key: "opt",
            title: "操作",
            render: (row) => {
              return (
                <div>
                  <button>编辑</button>
                  <button>删除</button>
                  <button>发布</button>
                </div>
              );
            },
          },
        ]}
      /> */}
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
