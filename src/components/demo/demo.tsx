import React, { Children, HTMLAttributes, ReactElement } from "react";

interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, ''> {

}

function Form(props: FormProps) {
  const { style, children } = props;
  let dom = null;
  if (Array.isArray(children)) {
    dom = children?.map((ele) => {
      const Ele = ele;
      if (ele.type.name === "FormItem") {
        const { name, children } = ele.props;
        const Item = children;
        if (name) {
          return null;
          // return <Ele>
          //   <Item onChange={(e: any) => { console.log(e) }} />
          // </Ele>
        }
      }

    })
  }
  return (
    <form>
      {/* {children} */}
      {dom}
    </form>
  );
}

function FormItem({ children }: { children: ReactElement, name: string }) {
  return (
    <div>
      {children}
    </div>
  );
}



export default function FormTest() {
  return <Form
    onReset={() => { }}
    onInput={() => { }}
    className="test"
    onSubmit={() => { }}
    onClick={() => { }}
  >
    <div>test</div>
    <FormItem name="test">
      <input />
    </FormItem>
  </Form>
}

