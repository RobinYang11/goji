import React from "react";
import "./index.less";
import classnames from "classnames";

//如何继承 DOMAttributes

type type = "primary" | "link" | "dashed" | "text" | "disable";
type iconPos = "left" | "right";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * type:类型
   */
  types?: type | undefined;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  children?: React.ReactNode | undefined;
  icon?: React.ReactNode | undefined;
  /**
   * iconPos:图标定位 左和右
   */
  iconPos?: iconPos | undefined;
  herf?: string | undefined;
  disabled?: boolean | undefined;
}

const Button = (props: IButton) => {
  const { types, style, className, children, icon, iconPos, disabled } = props;

  const getBtnClass = () => {
    switch (types) {
      case "primary":
        return "primaryButton gojiButton";
      case "dashed":
        return "dashedButton gojiButton";
      case "link":
        return "linkButton gojiButton";
      case "text":
        return "textButton gojiButton";
      case "disable":
        return "disable gojiButton";
      default:
        return "gojiButton";
    }
  };

  return (
    <button
      className={classnames(
        `${getBtnClass()} ${className} ${disabled && "disableButton"}`
      )}
      style={{ ...style }}
      {...props}
    >
      {icon && iconPos === "left"} {children ? children : "BUTTON"}
      {icon && iconPos === "right"}
    </button>
  );
};

export default Button;
