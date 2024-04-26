import React, { HTMLAttributes } from "react";

interface DemoProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {

}

function Demo(props: DemoProps) {
  const { style, children } = props;
  console.log(children)
  return (
    <form>
      {children}
    </form>
  );
}

function FormItem(props: any) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default function DemoTest() {
  return <Demo
    onReset={() => { }}
    onInput={() => { }}
    className="test"
    onSubmit={() => { }}
    onClick={() => { }}
  >
    <div>test</div>
    <FormItem>
      formItem
    </FormItem>
  </Demo>
}

