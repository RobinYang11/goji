import React, { useEffect, useState } from "react";
import "./index.less";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  style?: React.CSSProperties;
  value: string | number | undefined;
  maxLength?: number | undefined;
  defaultValue?: Readonly<string> | number | undefined;
}

const Input = (props: IProps) => {
  const { value, maxLength, className, style, defaultValue } = props;
  const [inputLength, setInputLength] = useState(0);

  useEffect(() => {
    if (typeof value === "string") {
      let inputValues = value?.split("").length;
      setInputLength(inputValues);
    } else if (typeof value === "number") {
      let inputValueNumber = value.toString().split("").length;
      setInputLength(inputValueNumber);
    } else {
      setInputLength(0);
    }
  }, [value]);

  useEffect(() => {
    if (typeof defaultValue === "string") {
      const defaultValueStringLength = defaultValue?.split("").length;
      setInputLength(defaultValueStringLength);
    } else if (typeof defaultValue === "number") {
      const defaultValueNumberLength = defaultValue.toString().split("").length;
      setInputLength(defaultValueNumberLength);
    } else {
      setInputLength(0);
    }
  }, []);

  return (
    <>
      <div
        className={`${inputLength <= 10 ? "inputBox" : "action"} ${className}`}
        style={{ ...style }}
      >
        <input type="text" defaultValue={defaultValue} {...props} />
        <span className="numberLimit">{`${inputLength}/${
          maxLength && maxLength
        }`}</span>
      </div>
      {inputLength > 10 && (
        <span className="message">内容超过10，请重新输入</span>
      )}
    </>
  );
};

export default Input;
