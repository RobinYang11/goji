import React, { useState } from "react";
import ReactDom from "react-dom";

// import * as GOJI from "goji_ui";
// import Input from "./components/input";
import Table from "./components/table/table";
import Upload from "./components/upload/upload";
import Form, { FormItem } from "./components/form/form";
import Input from "./components/input";
import Pagination from "./components/pagenation";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div>ksks</div>
      <Pagination
        // total={50}
        pageSize={5}
        dataSource={[
          1, 2, 3, 4, 1, 2, 3, 1, 21, 3, 2132, 131, 2321, 321, 21, 31, 31, 31,
          31, 312, 321, 31, 321, 31, 31, 31, 31, 31, 31, 31, 31, 3, 1,
        ]}
        defaultCurrent={2}
        onChange={(current)=>{console.log(current)}}
      />
      {/* <Form>
        <FormItem name="robin">
          <input />
        </FormItem>
        <FormItem name="test">
          <input />
        </FormItem>
      </Form> */}
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
