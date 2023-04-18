import React, { useState } from "react";
import ReactDom from "react-dom";
import Modal from "./components/modal/modal";
import Upload from "./components/upload/upload";
import Tab from "./components/tab/tab";
import * as GOJI from "goji_ui";
import Input from "./components/input";
import Drawer from "./components/drawer";
import { Span } from "./dom";

function App() {
  const [visible, setVisible] = useState(false);
  const [ev, setEv] = useState(false);
  const [value, setValue] = useState(10);
  const [open, setOpen] = useState(false);

  const handleClick = (e: unknown) => {
    setValue(e?.target.value);
    console.log("e", e?.target.value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        position="left"
        size="default"
        // maskClosable={false}
        title={<span>标题是什么呀</span>}
        extra={<button>操作</button>}
      >
        {/* <p>kdsks</p>
        <p>kdsks</p> */}
      </Drawer>

      <button onClick={showDrawer}>open</button>

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
