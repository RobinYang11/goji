import React, { useState } from "react";
import styles from "./index.module.less";

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
  /** 外层容器的样式 */
  style?: React.CSSProperties;
  /** 外层容器的类名 */
  modalClassName?: string;
  /** 遮罩层的样式 */
  maskStyle?: React.CSSProperties;
  /** 内容区域的样式 */
  contentStyle?: React.CSSProperties;
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
    style,
    modalClassName = "",
    contentStyle,
    maskStyle,
  } = props;
  if (!open) return null;

  const modalStyle = {
    ...style,
    width,
  };
  const modalClsName = modalClassName
    ? `${styles.modal} ${modalClassName}`
    : styles.modal;
  console.log(styles);
  return (
    <>
      <div className={modalClsName} style={modalStyle}>
        <div className={styles.close} onClick={onCancel}>
          x
        </div>
        <div className={styles.header}>
          <strong>{title}</strong>
        </div>
        <div className={styles.content} style={contentStyle}>
          {children}
        </div>
        <div className={styles.footer}>
          {footer ? (
            footer
          ) : (
            <>
              <button className={styles["my-button"]} onClick={onCancel}>
                {cancelText ? cancelText : "取消"}
              </button>
              <button className={styles["my-button"]} onClick={onOk}>
                {okText ? okText : "确定"}
              </button>
            </>
          )}
        </div>
      </div>
      {mask ? (
        <div
          className={styles.mask}
          style={maskStyle}
          onClick={isMaskClosed ? onCancel : undefined}
        ></div>
      ) : null}
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
          isMaskClosed={false}
          // maskStyle={{ backgroundColor: "red" }}
          style={{ backgroundColor: "aliceblue" }}
          // modalClassName="test"
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
