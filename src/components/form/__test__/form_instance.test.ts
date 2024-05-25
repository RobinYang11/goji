import { FormInstance } from "../form_instance"

export async function waitFor(cb: () => void) {

  return new Promise((r, j) => {
    setTimeout(() => {
      cb();
      r("ok")
    }, 1000)
  })
}


describe('FormInstance', () => {
  let formInstance: FormInstance;

  beforeEach(() => {
    formInstance = new FormInstance();
  });

  test('FormInstance handle validation of custom rule', async () => {

    const fieldName = 'name';
    const message = "Must be a valid email address"
    formInstance.rules[fieldName] = {
      email: {
        message,
      }
    }
    const value = 'test value';
    const callback = jest.fn(() => { });

    formInstance.setValue(fieldName, value, callback);

    await waitFor(() => {
      expect(callback).toBeCalledTimes(1);
      expect(message).toEqual(formInstance.errors[fieldName]);
    });
  });


  test('should validate multiple rules', async () => {

    formInstance = new FormInstance();
    const fieldName = 'password';
    formInstance.rules = {
      password: {
        minLength: {
          value: 4
        }
      }
    }
    const value = 'Abc123456';
    const c = jest.fn((v) => { });

    formInstance.setValue(fieldName, value, c);
    await waitFor(() => {
      // expect(c).toBeCalledTimes(1);
      // expect(formInstance.errors[fieldName]).toEqual("must be a email");
    });
  });


  test('should validate a valid email', async () => {
    const callback = jest.fn();
    formInstance.rules = {
      email: {
        email: {
          message: 'Must be a valid email address',
        },
      },
    };
    const value = 'test@qq.com';
    formInstance.setValue('email', value, callback);
    await waitFor(() => {
      expect(formInstance.errors.email).toBeUndefined();
    })
  });
});

