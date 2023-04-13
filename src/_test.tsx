import React, { useState } from "react";
import ReactDom from "react-dom";
import Modal from "./components/modal/modal";
import Upload from "./components/upload/upload";
import Tab from "./components/tab/tab";
import * as GOJI from "goji_ui";
import Input from "./components/input";
import Tag from "./components/tag";

function App() {
  const [visible, setVisible] = useState(false);
  const [ev, setEv] = useState(false);
  const [value, setValue] = useState(10);

  const handleClick = (e: unknown) => {
    setValue(e?.target.value);
    console.log("e", e?.target.value);
  };

  return (
    <div>
      <div style={{ margin: "10px", display: "flex" }}>
        <Tag
          background="success"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-down"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 9l6 6l6 -6"></path>
            </svg>
          }
        >
          Success
        </Tag>
        <Tag
          background="error"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-x"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
              <path d="M10 10l4 4m0 -4l-4 4"></path>
            </svg>
          }
        >
          Error
        </Tag>
        <Tag background="processing">Processing</Tag>
        <Tag background="waring">Waring</Tag>
        <Tag
          closable={true}
          closeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          }
          onClose={(e) => {
            console.log("eeee", e);
          }}
        >
          Delete
        </Tag>
        <Tag background="red" color="#fff">
          tag
        </Tag>
      </div>

      <Input
        defaultValue={"undefinedssss"}
        maxLength={10}
        value={value}
        onChange={handleClick}
        onBlur={() => {
          console.log("kdsk");
        }}
        onFocus={() => {
          console.log("sssss");
        }}
      />
      {/* <GOJI.Tab
			extSelector={'.tab'}
			extension={<div>这是扩展的内容</div>}
			items={[
				{
					title: "tab1",
					key: "tab1",
					children: <div>test</div>
				},
				{
					title: "tab2",
					key: "tab2",
					children: <div>tab2</div>
				}
			]}
		/> */}
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
      {/* <DropDown
        trigger={"click"}
        visible={modalVisible}
        setVisible={setModalVisible}
        onChangeVisible={() => {
          setModalVisible(!modalVisible);
        }}
        position="topRight"
        width={150}
        modelContent={[
          {
            id: "1",
            label: "first Item",
          },
          {
            id: "2",
            label: "second Item",
          },
        ]}
        // className={"modless"}
      >
        SHOW MODEL
      </DropDown> */}
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
