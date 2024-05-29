import { useContext, useEffect, useId, useRef } from "react";
import { FormStore } from "./context";
import { FormInstance } from "./form_instance";
import { v4 as uuidv4 } from 'uuid';


export const FORM_PREFIX = "__E9U_FORM_PREFIX__";
export const createForm = () => {
  const name = FORM_PREFIX + uuidv4();
  return new FormInstance(name);
}
export function useForm(props: { form?: FormInstance }): {
  form: FormInstance | undefined
} {
  console.log("###",props);
  const {
    registerForm,
    uninstallForm
  } = useContext(FormStore);

  // store the fromInstance
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    let formInstance = null;
    if (!formRef.current) {
      formInstance = props?.form || createForm();
      formRef.current = formInstance
      registerForm(formInstance.name, formInstance);
    }
    return () => { uninstallForm(''); }
  }, [])

  return {
    form: formRef?.current
  }
}