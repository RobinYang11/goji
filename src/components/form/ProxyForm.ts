

import isAsyncFn from 'is-async-function';

export class ProxyForm {

  private values: Record<string, any> = {};
  rules: Record<string, Function[]> = {};
  errors: Record<string, any> = {};
  filters: Record<string, any> = {};

  constructor(reRenderCallback: () => void) {
    const that = this;
    this.values = new Proxy({}, {
      set(target: Record<string, any>, prop: string, value: any) {
        target[prop] = value;
        that.validateField(prop);
        reRenderCallback();
        return true;
      },
      get(target: Record<string, any>, prop: string) {
        return target[prop];
      }
    })
  }

  validate(field: string, value: any, rules: Function[]): void {

    const doValidate = async (next: Function) => {
      if (index >= rules.length) {
        return;
      }
      try {
        if (isAsyncFn(next)) {
          await next(value);
        } else {
          next(value);
        }
        index++;
        doValidate(rules[index]);
      } catch (err) {
        this.errors[field] = err;
      }
    }

    let index = 0;
    doValidate(rules[index]);
  };

  validateField(field: string): void {
    const rules = this.rules[field];
    if (!rules) return;
    const value = this.values[field];
    this.validate(field, value, rules);
  }

  public addRule(name: string, rule: Function[]) {
    this.rules[name] = rule;
  };

  public addFilter(name: string, filter: Function[]) {
    this.filters[name] = filter;
  }

  public getValues(): Record<string, any> {
    return this.values;
  }

  public setValue(name: string, value: any): void {
    this.values[name] = value;
  }

  public setValues(values: Record<string, any>): void {
    this.values = {
      ...this.values,
      ...values
    };
  }

}