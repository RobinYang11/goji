import { ItemRule } from '../FormItem';
import { FormInstance, FormValues } from '../form_instance';

describe('FormInstance', () => {
  let formInstance: FormInstance;

  beforeEach(() => {
    formInstance = new FormInstance();
  });

  test('validate method sets error for a field with invalid value', async () => {
    const fieldName = 'testField';
    const value = 'invalidValue';
    const rules: ItemRule[] = [
      {
        validator: async (val: any) => {
          if (val !== 'validValue') {
            throw new Error('Invalid value');
          }
        },
      },
    ];

    formInstance.rules[fieldName] = rules;
    formInstance.values[fieldName] = value;

    formInstance.validateField(fieldName);

    expect(formInstance.errors[fieldName]).toBe('Invalid value');
  });

  test('validate method does not set error for a field with valid value', async () => {
    const fieldName = 'testField';
    const value = 'validValue';
    const rules: ItemRule[] = [
      {
        validator: async (val: any) => {
          if (val !== 'validValue') {
            throw new Error('Invalid value');
          }
        },
      },
    ];

    formInstance.rules[fieldName] = rules;
    formInstance.values[fieldName] = value;

    formInstance.validateField(fieldName);

    expect(formInstance.errors[fieldName]).toBeUndefined();
  });

  test('validate method handles async validator', async () => {
    const fieldName = 'testField';
    const value = 'validValue';
    const rules: ItemRule[] = [
      {
        validator: async (val: any) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (val !== 'validValue') {
                reject(new Error('Invalid value'));
              } else {
                resolve();
              }
            }, 100);
          });
        },
      },
    ];

    formInstance.rules[fieldName] = rules;
    formInstance.values[fieldName] = value;

    formInstance.validateField(fieldName);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(formInstance.errors[fieldName]).toBeUndefined();
  });

  test('validate method handles multiple rules', async () => {
    const fieldName = 'testField';
    const value = 'invalidValue';
    const rules: ItemRule[] = [
      {
        validator: async (val: any) => {
          if (val.length < 5) {
            throw new Error('Value must be at least 5 characters long');
          }
        },
      },
      {
        validator: async (val: any) => {
          if (!/^[a-zA-Z]+$/.test(val)) {
            throw new Error('Value can only contain letters');
          }
        },
      },
    ];

    formInstance.rules[fieldName] = rules;
    formInstance.values[fieldName] = value;

    formInstance.validateField(fieldName);

    expect(formInstance.errors[fieldName]).toBe('Value must be at least 5 characters long');
  });

  test('validate method handles multiple rules and sets the first error encountered', async () => {
    const fieldName = 'testField';
    const value = '1234';
    const rules: ItemRule[] = [
      {
        validator: async (val: any) => {
          if (val.length < 5) {
            throw new Error('Value must be at least 5 characters long');
          }
        },
      },
      {
        validator: async (val: any) => {
          if (!/^[a-zA-Z]+$/.test(val)) {
            throw new Error('Value can only contain letters');
          }
        },
      },
    ];

    formInstance.rules[fieldName] = rules;
    formInstance.values[fieldName] = value;

    formInstance.validateField(fieldName);

    expect(formInstance.errors[fieldName]).toBe('Value must be at least 5 characters long');
  });
});