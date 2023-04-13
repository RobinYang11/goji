import React from "react";
import "./index.less";
import classnames from "classnames";

type tagsBackgroundColor =
  | "success"
  | "default"
  | "waring"
  | "error"
  | "processing"
  | string
  | undefined;

type ITagProps = {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  children: React.ReactNode;
  color?: string | undefined;
  background?: tagsBackgroundColor;
  bordered?: boolean | undefined;
  icon?: React.ReactNode | undefined;
  closeIcon?: React.ReactNode | undefined;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void | undefined;
  closable?: boolean | undefined;
};

const Tag: React.FC<ITagProps> = (props) => {
  const {
    className,
    style,
    children,
    color,
    background,
    onClose,
    icon,
    closeIcon,
    bordered = true,
    closable,
  } = props;

  const TagColor = (background: tagsBackgroundColor) => {
    switch (background) {
      case "success":
        return "success";
      case "waring":
        return "waring";
      case "error":
        return "error";
      case "processing":
        return "processing";
      default:
        break;
    }
  };

  return (
    <span
      className={classnames(
        `tag ${className} ${!bordered && "bordered"} ${TagColor(background)}`
      )}
      style={{ background: `${background}`, color: `${color}`, ...style }}
    >
      <div className="tagIconAndTagText">
        {!closable && <span className="tagIcon">{icon}</span>}
        <span className="tagText">{children}</span>
        <span className="deleteIcon" onClick={onClose}>
          {closable && closeIcon}
        </span>
      </div>
    </span>
  );
};

export default Tag;
