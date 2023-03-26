import React, { useState } from "react";

interface ListSelectProps {
  items: Array<{ label: string; value: any }>;
  mode: "multiple" | "single";
  value?: unknown | [unknown];
  onChange(value: unknown): void;
}

export default function ListSelect({ mode, items, onChange }: ListSelectProps) {
  const [currentValue, setCurrentValue] = useState(null);
  const [changeValue, setChangeValue] = useState<any[]>([]);
  const onchangeValueSingle = (e: any, value: any) => {
    setCurrentValue(e?.target?.checked && value);
    onChange(value);
  };
  const onchangeValueMutiple = (e: any, value: any) => {
    if (e.target?.checked) {
      setChangeValue((v) => {
        onChange([...v, value]);
        return [...v, value];
      });
    } else {
      setChangeValue((v) => {
        onChange(v.filter((vl) => vl !== value));
        return v.filter((vl) => vl !== value);
      });
    }
  };

  return (
    <ul>
      {mode === "single" &&
        items.map((i) => {
          return (
            <li>
              <input
                onChange={(e) => onchangeValueSingle(e, i.value)}
                checked={currentValue === i.value}
                type={"checkbox"}
                key={i.value}
              ></input>
              {i.label}
            </li>
          );
        })}
      {mode === "multiple" &&
        items.map((i) => {
          return (
            <li>
              <input
                onChange={(e) => onchangeValueMutiple(e, i.value)}
                type={"checkbox"}
                key={i.value}
              ></input>
              {i.label}
            </li>
          );
        })}
    </ul>
  );
}
