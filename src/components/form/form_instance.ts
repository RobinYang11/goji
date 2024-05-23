

import isAsyncFn from 'is-async-function';
import { ItemRule } from './FormItem';


export type FormValues = Record<string, any>;

function isPromiseFunction(func: Function): boolean {
  const result = func();
  return result instanceof Promise;
}

export class FormInstance {
  name: string = ''
  values: FormValues = {}
  errors: Record<string, any> = {};
  rules: Record<string, ItemRule[]> = {}
  valueFilters: Record<string, Function> = {};

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  filterValues(values: Record<string, any>) {
    const newValues = { ...values };
    Object.keys(newValues).forEach((key) => {
      if (this.valueFilters[key]) {
        newValues[key] = this.valueFilters[key](newValues[key]);
      }
    });
    return newValues;
  }

  validate(field: string, value: any, rules: ItemRule[]): void {

    const doValidate = async (next: any) => {
      try {
        await next(value);
        index++;
        if (index >= rules.length) {
          return;
        }
        doValidate(rules[index].validator);
      } catch (err) {
        if (typeof err === 'string') {
          this.errors[field] = err;
        } else {
          this.errors[field] = (err as Error)?.message;
        }
      }
    }

    let index = 0;
    doValidate(rules[index].validator);
  };

  public setValue(fieldName: string, value: any) {
    this.values[fieldName] = value;
    this.validateField(fieldName);
  };

  validateField(fieldName: string): void {
    const rules = this.rules[fieldName]
    if (!rules) return;
    const value = this.values[fieldName];
    this.validate(fieldName, value, rules);
  }

}
