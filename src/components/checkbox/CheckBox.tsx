import React, { ReactElement, ReactNode, useMemo } from "react"


interface ICheckBox {
  checked: boolean;
  label: string;
  onChange?: (evt: any) => void;
}

function CheckBox(props: ICheckBox) {
  const { checked, label, onChange } = props
  return <input checked={checked} onChange={onChange} type="checkbox" />
}

interface ICheckBoxGroup {
  children: ReactElement[]
  value?: [];
  onChange?: (value: any) => void;
  name?: string
}

function CheckBoxGroup(props: ICheckBoxGroup) {
  let { value = [], onChange, children, name = '' } = props
  const renderChilden = useMemo(() => {

    if (Array.isArray(children)) {
      return children.map((child, index) => {
        // value![index] = false;
        return React.cloneElement(child, {
          checked: value?.[index],
          name,
          index,
          onChange: (e: any) => {
            // console.log("EE", e.target.value, e.target.checked)
            // value?.[index] = e.target.checked
            // onChange()
            // onChange?.([...value, child.props.value])
          }
        })
      })
    }

    return React.cloneElement(children, {
      value: children.props.value,
      onChange: (e: any) => {
        onChange?.([children.props.value])
      }
    })
  }, [])

  return <div>
    {renderChilden}
  </div>
}

CheckBox.Group = CheckBoxGroup;

export default CheckBox;