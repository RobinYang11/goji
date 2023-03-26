import React, { useCallback, useState } from "react";
import ReactDom from "react-dom";
import Modal from "./components/modal/modal";
import Upload from "./components/upload/upload";
import Tab from "./components/tab/tab";
import Table from "./components/table/table";
import Pop from "./components/pop";
import LazyPullRequest from "./components/lazyPullRequest";

import * as GOJI from "goji_ui";
const requestImg = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
        {
          src: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
          alt: "123",
        },
      ]);
    }, 1000);
  });
};
const data = [
  {
    id: "1",
    name: "李四",
    height: "180cm",
    weight: "75KG",
  },
  {
    id: "2",
    name: "张三",
    height: "140cm",
    weight: "20KG",
  },
  {
    id: "3",
    name: "王五",
    height: "120cm",
    weight: "80KG",
  },
  {
    id: "4",
    name: "李2",
    height: "180cm",
    weight: "75KG",
  },
  {
    id: "5",
    name: "张3",
    height: "140cm",
    weight: "20KG",
  },
  {
    id: "6",
    name: "王4",
    height: "120cm",
    weight: "80KG",
  },
  {
    id: "7",
    name: "李7",
    height: "180cm",
    weight: "75KG",
  },
  {
    id: "8",
    name: "张8",
    height: "140cm",
    weight: "20KG",
  },
  {
    id: "9",
    name: "王9",
    height: "120cm",
    weight: "80KG",
  },
  {
    id: "10",
    name: "李10",
    height: "180cm",
    weight: "75KG",
  },
  {
    id: "11",
    name: "张11",
    height: "140cm",
    weight: "20KG",
  },
  {
    id: "12",
    name: "王12",
    height: "120cm",
    weight: "80KG",
  },
];
function App() {
  const col = [
    {
      key: "1",
      title: "名字",
      name: "name",
      filters: [
        { label: "张三", value: "2" },
        { label: "李四", value: "1" },
      ],
    },
    {
      key: "2",
      title: "身高",
      name: "height",
    },
    {
      key: "3",
      title: "体重",
      name: "weight",
      sort: (a: any, b: any) => parseInt(a.weight) - parseInt(b.weight),
    },
    {
      key: "options",
      title: "操作",
      name: "options",
      render(item: any) {
        return (
          <>
            {item.id !== "3"
              ? [
                  <Pop
                    title={<>姓名：{item.name}</>}
                    content={<>身高：{item.height}</>}
                  >
                    <a style={{ color: "blue" }}>点击查看气泡</a>
                  </Pop>,
                  <div>111</div>,
                ]
              : [
                  <Pop
                    content={<LazyPullRequest request={requestImg} />}
                    title={<>图片懒加载</>}
                  >
                    <a style={{ color: "blue" }}>图片懒加载</a>
                  </Pop>,
                  <div>111</div>,
                ]}
          </>
        );
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const [ev, setEv] = useState(false);
  return (
    <div>
      {/* 涵盖1，3，4，5题 弹窗和气泡类似，没做 vx17606727572 */}
      <Table
        width={"1000px"}
        data={data}
        cols={col}
        pagination={{ pageSize: 10 }}
      />
      <h1>test</h1>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        show modal
      </button>
      <Tab
        onTabChange={() => {
          setEv(true);
        }}
        hiddenStyle={{
          height: "0px",
          overflow: "hidden",
        }}
        tabContentVisible={ev}
        extSelector={'[aria-label="tab"]'}
        extension={
          <div
            onClick={() => {
              setEv(!ev);
            }}
            className="ext"
          >
            这是扩展的内容
          </div>
        }
        items={[
          {
            title: "tab1",
            key: "tab1",
            children: <div>tab1</div>,
          },
          {
            title: "tab2",
            key: "tab2",
            children: <div>tab2</div>,
          },
        ]}
      />

      <Modal
        // dontDestroyOnClose={true}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        <div>
          how to set default value for typescript interface field
          <input type="text" />
        </div>
      </Modal>

      <Upload
        uploadUrl="/api/video-service/upload"
        beforeUpload={(f) => {
          for (var i = 0; i < f.length; i++) {
            console.log(f[i].name);
          }
          return new Promise((r, j) => {
            setTimeout(() => {
              r(f);
            }, 1000);
          });
        }}
        valueFilter={({ response }) => {
          return (response as Record<string, Object>).url;
        }}
        onComplete={(res: any[]) => {
          console.log(res);
        }}
      >
        请选择文件
      </Upload>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
