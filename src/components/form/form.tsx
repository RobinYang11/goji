import React, { ReactElement } from "react";
import { UseFormReturn } from "react-hook-form";

type WithOutFormProps = Omit<React.HTMLProps<HTMLFormElement>, "form">;

export interface FormProps extends WithOutFormProps {
  children: any;
  labelCol?: number;
  contentCol?: number;
  onSubmit: (data: Record<string, any>) => void;
  form: UseFormReturn;
}

export default function Form(props: FormProps) {
  const { form, children, labelCol, contentCol, onSubmit } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const res = children?.map((i: ReactElement) => {
    if (typeof i.type === "string") {
      if (i.type === "button") return i;
    }
    return React.cloneElement(i, {
      ...register(i.props.name),
      control,
      contentCol,
      labelCol,
      key: i.props.name,
    });
  });

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        onSubmit?.(data);
      })}
    >
      {res}
    </form>
  );
}
