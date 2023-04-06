import React, { useEffect, useState } from "react";
import "./index.less";

type IProps = {
  value?: string | number | undefined;
  defaultValue?: string | number | undefined;
  maxLength?: number | undefined;
  onChange: (e: Event) => void;
};

const Input: React.FC<IProps> = ({
  value,
  defaultValue,
  maxLength,
  onChange,
}) => {
  const [inputLength, setInputLength] = useState(0);

  useEffect(() => {
    if (value) {
      let inputValues = value.split("").length;
      setInputLength(inputValues);
    } else {
      setInputLength(0);
    }
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === "number") {
        let defaultValueArrayLength = defaultValue
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
  }, [defaultValue]);

  return (
    <>
      <div className={inputLength < 10 ? "inputBox" : "action"}>
        <input
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={(e: Event) => onChange(e)}
        />
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
