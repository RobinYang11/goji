import { useContext, useEffect, useId, useRef } from "react";
import { FormStore } from "./context";
import { FormInstance } from "./form_instance";


export const FORM_PREFIX = "__E9U_FORM_PREFIX__";
export function useForm(): {
  form: FormInstance | undefined
} {
  // unique form id;
  const name = FORM_PREFIX + useId();
  const {
    registerForm,
    uninstallForm
  } = useContext(FormStore);

  // store the fromInstance
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    if (!formRef.current) {
      const formInstance = new FormInstance(name);
      formRef.current = formInstance
      registerForm(name, formInstance);
    }
    return () => { uninstallForm(name); }
  }, [])

  return {
    form: formRef?.current
  }
}