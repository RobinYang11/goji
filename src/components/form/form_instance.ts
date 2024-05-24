
export type FormValues = Record<string, any>;

// The validator function type which  must return a Promise
type PromiseFunction<T> = (value: any, rule: BaseRuleInfo) => Promise<T>

// The basice rule config properties
interface BaseRuleInfo {
  message?: string;
  value?: any
  validator?: PromiseFunction<any>
}

type BaseRuleKey<T> = {
  [key: string]: T;
  email: T;
  phone: T;
  minLength: T;
  maxLength: T;
  atLeastOneUpperCase: T;
  noSpecialCharacters: T;
}

export type IFormItemRule = Partial<BaseRuleKey<BaseRuleInfo>>

const baseValidators: BaseRuleKey<PromiseFunction<any>> = {
  phone: (value: any, rule) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phoneRegex.test(value)) {
      return Promise.resolve("ok");
    }
    return Promise.reject(rule?.message || "Invalid phone number!")
  },
  email: (value: any, rule) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(value)) {
      return Promise.resolve("ok");
    }
    return Promise.reject(rule?.message || "Invalid email");
  },

  minLength: (value, rule) => {

    if (typeof value !== "string") {
      throw new Error("minLength only for string")!
    }

    const minLength = rule?.value || 0;
    if (value.length >= minLength) {
      return Promise.resolve("ok");
    }
    return Promise.reject(rule?.message || `Minimum length is ${minLength}`);
  },


  maxLength: (value: any, rule: BaseRuleInfo) => {
    if (typeof value !== "string") {
      throw new Error("minLength only for string")!
    }
    const maxLength = rule?.value || Number.MAX_SAFE_INTEGER;

    if (value.length <= maxLength) {
      return Promise.resolve("ok");
    }
    return Promise.reject(rule?.message || `Maximum length is ${maxLength}`);
  },

  atLeastOneUpperCase: (value: any, rule: BaseRuleInfo) => {
    const regex = /[A-Z]/;
    if (regex.test(value)) {
      return Promise.resolve("ok");
    }
    return Promise.reject(rule?.message || "At least one uppercase character is required");
  },
  noSpecialCharacters: (value: any, rule: BaseRuleInfo) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(value)) {
      return Promise.resolve("ok");
    }
    return Promise.reject(rule?.message || "No special characters are allowed");
  },
}

export class FormInstance {
  name: string = ''
  values: FormValues = {}
  errors: Record<string, any> = {};
  rules: Record<string, IFormItemRule> = {}
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


  public setValue(fieldName: string, value: any, callback: (value: any) => void): void {
    this.values[fieldName] = value;
    this.validateField(fieldName, callback);
  };

  validateField(fieldName: string, callback: (value: any) => void): void {
    let rules: any = this.rules[fieldName]
    if (!rules) return;
    const value = this.values[fieldName];
    rules = Object.keys(rules).map((key: string) => {
      // inject the validator into the rule when not provided
      if (!rules[key].validator) {
        return {
          validator: baseValidators[key],
          ...rules[key]
        }
      }
      return rules[key];
    })



    const doValidate = async (next: any) => {
      try {

        await next(value, rules[index]);
        index++;
        if (index >= rules.length) {
          return;
        }
        doValidate(rules[index].validator);
      } catch (err) {
        if (typeof err === 'string') {
          this.errors[fieldName] = err;
        } else {
          this.errors[fieldName] = (err as Error)?.message;
        }
        callback(this.errors[fieldName]);
      }
    }

    let index = 0;
    doValidate(rules[index].validator);
  }
}
