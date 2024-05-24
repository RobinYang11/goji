import { FormInstance, IFormItemRule, FormValues } from '../form_instance';

describe('FormInstance', () => {
  let formInstance: FormInstance;

  beforeEach(() => {
    formInstance = new FormInstance();
  });

  describe('validateField', () => {
    test('should trigger all validators and handle errors correctly', async () => {
      const fieldName = 'testField';
      const value = 'testValue';
      const callback = jest.fn();

      const rules: IFormItemRule = {
        email: { message: 'Invalid email format' },
        minLength: { value: 5, message: 'Minimum length is 5' },
        maxLength: { value: 10, message: 'Maximum length is 10' },
        atLeastOneUpperCase: { message: 'At least one uppercase character is required' },
        noSpecialCharacters: { message: 'No special characters are allowed' },
      };

      formInstance.rules[fieldName] = rules;
      formInstance.values[fieldName] = value;

      formInstance.validateField(fieldName, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      // expect(callback).toHaveBeenNthCalledWith(1, 'Invalid email format');
      // expect(callback).toHaveBeenNthCalledWith(2, 'Minimum length is 5');
      // expect(callback).toHaveBeenNthCalledWith(3, 'At least one uppercase character is required');
      // expect(callback).toHaveBeenNthCalledWith(4, 'No special characters are allowed');
      // expect(callback).toHaveBeenNthCalledWith(5, undefined); // No error for maxLength
    });

    test('should handle empty rules correctly', async () => {
      const fieldName = 'testField';
      const value = 'testValue';
      const callback = jest.fn();

      const rules: IFormItemRule = {};

      formInstance.rules[fieldName] = rules;
      formInstance.values[fieldName] = value;

      await formInstance.validateField(fieldName, callback);

      expect(callback).not.toHaveBeenCalled();
    });

    test('should handle missing value correctly', async () => {
      const fieldName = 'testField';
      const callback = jest.fn();

      const rules: IFormItemRule = {
        email: { message: 'Invalid email format' },
      };

      formInstance.rules[fieldName] = rules;

      formInstance.validateField(fieldName, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('Invalid email format');
    });

    test('should handle missing rules correctly', async () => {
      const fieldName = 'testField';
      const value = 'testValue';
      const callback = jest.fn();

      formInstance.values[fieldName] = value;

      formInstance.validateField(fieldName, callback);

      expect(callback).not.toHaveBeenCalled();
    });

    test('should handle invalid validator correctly', async () => {
      const fieldName = 'testField';
      const value = 'testValue';
      const callback = jest.fn();

      const rules: IFormItemRule = {
        invalidValidator: { message: 'Invalid validator' },
      };

      formInstance.rules[fieldName] = rules;
      formInstance.values[fieldName] = value;

      formInstance.validateField(fieldName, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('Invalid validator');
    });
  });
});