import React, { useEffect, useState } from "react";
import "./index.less";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  className?: string | undefined;
  style?: React.CSSProperties;
  value: string | number | undefined;
  maxLength?: number | undefined;
  defaultValue?: string | undefined;
}

const Input = (props: IProps) => {
  const { value, defaultValue, maxLength, className, style } = props;
  const [inputLength, setInputLength] = useState(0);

  useEffect(() => {
    if (value === "string") {
      let inputValues = value?.split("").length;
      setInputLength(inputValues);
    } else {
      setInputLength(0);
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === "number") {
        let defaultValueArrayLength = (defaultValue as any)
          ?.toString()
          ?.split("")?.length;
        setInputLength(defaultValueArrayLength);
      } else if (typeof defaultValue === "string") {
        let defaultValues = defaultValue.split("").length;
        setInputLength(defaultValues);
      } else {
        setInputLength(0);
      }
    }
  }, []);

  return (
    <>
      <div
        className={`${inputLength <= 10 ? "inputBox" : "action"} ${className}`}
        style={{ ...style }}
      >
        <input {...props} />
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
