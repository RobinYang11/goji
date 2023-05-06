import React, { ReactElement } from "react";
import { UseFormReturn } from "react-hook-form";

type WithOutFormProps = Omit<React.HTMLProps<HTMLFormElement>, "form">;

export interface FormProps extends WithOutFormProps {
  children: any;
  colLayout?: {
    labelTextAlign?: "left" | "center" | "right";
    labelCol: any;
    contentCol: any;
  };
  onSubmit: (data: Record<string, any>) => void;
  form: UseFormReturn;
}

export default function Form(props: FormProps) {
  const { form, children, colLayout, onSubmit } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const _copy = children?.map((i: ReactElement) => {
    if (typeof i.type === "string") {
      if (i.type === "button") return i;
    }
    return React.cloneElement(i, {
      ...register(i.props.name, i.props.rules),
      control,
      colLayout,
      key: i.props.name,
      form,
      errors,
    });
  });

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        onSubmit?.(data);
      })}
    >
      {_copy}
    </form>
  );
}
