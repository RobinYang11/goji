import React from "react";
import "./index.less";
import classnames from "classnames";

type position = "left" | "right" | "bottom" | "top";
type size = "default" | "large";

interface IDrawer extends React.DOMAttributes<HTMLDivElement> {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  /**
   * position:抽屉位置
   * */
  position?: position | undefined;
  children?: React.ReactNode | undefined;
  /**
   * title:抽屉标题 string类型
   */
  title?: React.ReactNode | undefined;
  /**
   * open:是否打开抽屉 boolean类型
   */
  open?: boolean | undefined;
  /**
   * onClose:关闭函数
   */
  onClose?: (e: any) => void | undefined;
  /**
   *size:预设抽屉宽度（或高度），default 378px 和 large 600px
   */

  size?: size | undefined;
  /**
   * maskClosable：点击蒙层是否允许关闭 默认值为true
   */
  maskClosable?: boolean | undefined;
  /**
   * extra:抽屉右上角的操作区域
   */
  extra?: React.ReactNode | undefined;
}

const Drawer: React.FC<IDrawer> = (props) => {
  const {
    className,
    style,
    position = "right",
    children,
    title,
    open,
    onClose,
    size = "default",
    maskClosable = true,
  } = props;

  const drawerPosition = {
    left: "position-left",
    right: "position-right",
    bottom: "position-bottom",
    top: "position-top",
  };

  console.log("position", position);

  return (
    <>
      {open && (
        <div className={`drawer  ${className}`} style={{ ...style }}>
          {maskClosable ? (
            <div
              className={`${open ? "drawer-mask" : "drawer-mask-none"}`}
              onClick={onClose}
            ></div>
          ) : (
            <div
              className={`${open ? "drawer-mask" : "drawer-mask-none"}`}
            ></div>
          )}
          <div
            className={classnames(
              `drawer-box
            ${position && drawerPosition[position]} ${open && size}
            ${
              position === "bottom" || position === "top"
                ? "top-to-height-reverse"
                : "left-to-right-reverse "
            }
             `
            )}
            style={{
              height:
                position === "bottom" || position === "top" ? "378px" : "100%",
              width:
                position === "bottom" || position === "top" ? "100%" : "378ppx",
            }}
          >
            <div className="drawer-title">
              <div className="drawer-title-right">
                <span className="drawer-delete-icon" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
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
                </span>
                <span className="drawer-title-text">{title || "title..."}</span>
              </div>
              <div>extra</div>
            </div>
            <div className="drawer-content">{children || "content..."}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
