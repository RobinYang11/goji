import React, { useState } from "react";
import ReactDom, { createPortal } from "react-dom";

// import * as GOJI from "goji_ui";
// import Input from "./components/input";
import Table from "./components/table/table";
import Upload from "./components/upload/upload";
import Form from "./components/form/form";
import { Controller, useForm } from "react-hook-form";
import Input from "./components/input/input";
import Button from "./components/button/button";
import ContextDeomo from "./context_demo";
import FormTest from "./components/form/_test";
// import Input from "./components/input";

// function Input(props: any) {
//   return (
//     <div>
//       <input
//         {...props}
//         value={props?.value || ""}
//         // ### dev.log1
//         // Warning: A component is changing an uncontrolled input to be controlled.
//         // This is likely caused by the value changing from undefined to a defined value,
//         // which should not happen.
//         // Decide between using a controlled or uncontrolled input element for the lifetime of the component.
//         //More info: https://reactjs.org/link/controlled-components
//       />
//     </div>
//   );
// }

function CustomForm({ value, onChange }: any) {
  return (
    <div>
      <span>{value}</span>
      <button
        onClick={() => {
          onChange("test");
        }}
      >
        change
      </button>
    </div>
  );
}

function App() {
  const [visible, setVisible] = useState(false);

  const form = useForm();
  const { reset } = form;
  return (
    <div>
      <FormTest /> 
      {/* <ContextDeomo /> */}
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
