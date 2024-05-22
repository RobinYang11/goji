
import { ProxyForm } from '../ProxyForm'; // Import the ProxyForm class

describe('ProxyForm', () => {
  let form: ProxyForm;
  let reRenderCallback: jest.Mock;

  beforeEach(() => {
    reRenderCallback = jest.fn();
    form = new ProxyForm(reRenderCallback);
  });

  test('validateField: single rule validation', async () => {
    const rule = jest.fn((value: any) => {
      if (value!== 'valid') {
        throw new Error('Invalid value');
      }
    });

    form.addRule('testField', [rule]);
    form.setValue('testField', 'invalid');
    form.validateField('testField');

    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for async validation

    expect(form.errors.testField).toEqual(new Error('Invalid value'));
    expect(reRenderCallback).toHaveBeenCalledTimes(1);
  });

  test('validateField: single rule validation with valid value', async () => {
    const rule = jest.fn((value: any) => {
      if (value!== 'valid') {
        throw new Error('Invalid value');
      }
    });

    form.addRule('testField', [rule]);
    form.setValue('testField', 'valid');
    form.validateField('testField');

    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for async validation

    expect(form.errors.testField).toBeUndefined();
    expect(reRenderCallback).toHaveBeenCalledTimes(1);
  });

  test('validateField: no rules for the field', () => {
    form.setValue('testField', 'invalid');
    form.validateField('testField');

    expect(form.errors.testField).toBeUndefined();
    expect(reRenderCallback).toHaveBeenCalledTimes(1); //
  });

  test('validateField: multiple rules, only first rule fails', async () => {
    const rule1 = jest.fn((value: any) => {
      if (value!== 'valid') {
        throw new Error('Invalid value');
      }
    });

    const rule2 = jest.fn((value: any) => {
      if (value === 'invalid') {
        throw new Error('Invalid value for rule 2');
      }
    });

    form.addRule('testField', [rule1, rule2]);
    form.setValue('testField', 'invalid');
    form.validateField('testField');

    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for async validation

    expect(form.errors.testField).toEqual(new Error('Invalid value'));
    expect(reRenderCallback).toHaveBeenCalledTimes(1);
  });

  test('validateField: multiple rules, all rules pass', async () => {
    const rule1 = jest.fn((value: any) => {
      if (value!== 'valid') {
        throw new Error('Invalid value');
      }
    });

    const rule2 = jest.fn((value: any) => {
      if (value === 'invalid') {
        throw new Error('Invalid value for rule 2');
      }
    });

    form.addRule('testField', [rule1, rule2]);
    form.setValue('testField', 'valid');
    form.validateField('testField');

    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for async validation

    expect(form.errors.testField).toBeUndefined();
    expect(reRenderCallback).toHaveBeenCalledTimes(1);
  });
});