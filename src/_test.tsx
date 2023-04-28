import React, { useState } from "react";
import ReactDom from "react-dom";

// import * as GOJI from "goji_ui";
// import Input from "./components/input";
import Table from "./components/table/table";
import Upload from "./components/upload/upload";
import Form from "./components/form/form";
import { Controller, useForm } from "react-hook-form";
import { FormItem } from "./components/form/form_item/form_item";
// import Input from "./components/input";

function Input(props: any) {
  return (
    <div>
      <input
        {...props}
        value={props?.value || ""}
        // ### dev.log1
        // Warning: A component is changing an uncontrolled input to be controlled.
        // This is likely caused by the value changing from undefined to a defined value,
        // which should not happen.
        // Decide between using a controlled or uncontrolled input element for the lifetime of the component.
        //More info: https://reactjs.org/link/controlled-components
      />
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
        form={form}
        onSubmit={(data) => {
          console.log("##data", data);
        }}
      >
        <FormItem name="addr">
          <Input />
        </FormItem>
        <FormItem name="name">
          <Input />
        </FormItem>
        <FormItem name="age" extension={<span>TEST</span>} extSelector="">
          <Input />
        </FormItem>
        <button>test</button>
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
