import React, { useState } from "react";
import "./index.less";

interface ModalProps {
  /** 控制弹框的显示隐藏 */
  open: boolean;
  /** 点击确定是的回调 */
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 点击取消时候回调 */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /** 弹框内容 */
  children?: React.ReactNode;
  /** 弹框头部内容 */
  title?: React.ReactNode;
  /** 弹框底部内容 */
  footer?: React.ReactNode;
  /** 弹框宽度 默认 520 */
  width?: string | number;
  /** 按钮文案 */
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  /** 是否显示遮罩层 */
  mask?: boolean;
  /** 有遮罩层时是否点击关闭 */
  isMaskClosed?: boolean;
}

function MyModal(props: ModalProps) {
  const {
    open,
    onOk,
    onCancel,
    children,
    title,
    footer,
    width = 520,
    okText,
    cancelText,
    mask = true,
    isMaskClosed = true,
  } = props;
  if (!open) return null;

  return (
    <>
      <div className="modal" style={width ? { width } : undefined}>
        <div className="close" onClick={onCancel}>
          x
        </div>
        <div className="header">
          <strong>{title}</strong>
        </div>
        <div className="content">{children}</div>
        <div className="footer">
          {footer ? (
            footer
          ) : (
            <>
              <button onClick={onCancel}>
                {cancelText ? cancelText : "取消"}
              </button>
              <button onClick={onOk}>{okText ? okText : "确定"}</button>
            </>
          )}
        </div>
      </div>
      <div
        className="mask"
        style={!mask ? { backgroundColor: "transparent" } : undefined}
        onClick={mask && isMaskClosed ? onCancel : undefined}
      ></div>
    </>
  );
}
export default function HjjTables() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="hjj-modal">
      <p>--------------------------------------</p>
      <button onClick={() => setIsModalOpen(true)}>打开弹框</button>
      {isModalOpen ? (
        <MyModal
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          title="自定义头部"
          okText="确定文案"
          cancelText="取消文案"
          footer={null}
          width={700}
          // mask={false}
          // isMaskClosed={false}
        >
          <p>自定义内容--------------------</p>
          <p>自定义内容--------------------</p>
          <p>自定义内容--------------------</p>
          <p>自定义内容--------------------</p>
        </MyModal>
      ) : null}
      <p>--------------------------------------</p>
    </div>
  );
}
