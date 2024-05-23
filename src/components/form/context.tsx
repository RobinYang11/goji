import React from "react";
import { FormInstance } from "./form_instance";

export interface IFormStore {
  forms: Record<string, FormInstance | undefined>,
  registerForm: (formName: string, form: FormInstance) => void,
  uninstallForm: (formName: string) => void
  updateForm: (formName: string, form: FormInstance) => void
}



export const FormStore = React.createContext<IFormStore>({
  forms: {},
  registerForm: (fromName: string, form: FormInstance) => { },
  uninstallForm: (formName: string) => { },
  updateForm: (formName: string, form: FormInstance) => { }
});

