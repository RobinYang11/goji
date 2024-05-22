import { ProxyForm } from '../ProxyForm';

describe('ProxyForm', () => {
  let form: ProxyForm;

  beforeEach(() => {
    form = new ProxyForm(() => {});
  });

  test('addRule adds a rule for a field', () => {
    const rule = (value: any) => {
      if (value === 'test') {
        return;
      }
      throw new Error('Invalid value');
    };

    form.addRule('fieldName', [rule]);

    expect(form.rules.fieldName).toEqual([rule]);
  });

  test('addFilter adds a filter for a field', () => {
    const filter = (value: any) => {
      return value.toUpperCase();
    };

    form.addFilter('fieldName', [filter]);

    expect(form.filters.fieldName).toEqual([filter]);
  });

  test('addRule does not overwrite existing rules for a field', () => {
    const rule1 = (value: any) => {
      if (value === 'test') {
        return;
      }
      throw new Error('Invalid value');
    };

    const rule2 = (value: any) => {
      if (value.length > 5) {
        return;
      }
      throw new Error('Value too short');
    };

    form.addRule('fieldName', [rule1]);
    form.addRule('fieldName', [rule2]);

    expect(form.rules.fieldName).toEqual([rule2]);
  });

  test('addFilter does not overwrite existing filters for a field', () => {
    const filter1 = (value: any) => {
      return value.toLowerCase();
    };

    const filter2 = (value: any) => {
      return value.toUpperCase();
    };

    form.addFilter('fieldName', [filter1]);
    form.addFilter('fieldName', [filter2]);

    expect(form.filters.fieldName).toEqual([filter2]);
  });

  test('addRule and addFilter do not affect other fields', () => {
    const rule = (value: any) => {
      if (value === 'test') {
        return;
      }
      throw new Error('Invalid value');
    };

    const filter = (value: any) => {
      return value.toUpperCase();
    };

    form.addRule('fieldName1', [rule]);
    form.addFilter('fieldName2', [filter]);

    expect(form.rules.fieldName1).toEqual([rule]);
    expect(form.filters.fieldName2).toEqual([filter]);
    expect(form.rules.fieldName2).toBeUndefined();
    expect(form.filters.fieldName1).toBeUndefined();
  });
});