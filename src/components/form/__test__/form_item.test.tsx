

import { render } from '@testing-library/react';
import FormItem from '../FormItem';
import Form from '../Form';
import { waitFor } from './form_instance.test';


describe("Form", () => {

  test('Basic Html attributes usage', async () => {

    const { container } = render(
      <Form className='form' title='form'>

        <FormItem className="robin" name="name">
          <input />
        </FormItem>

        <FormItem>
          <img alt="image" src="test" />
        </FormItem>

        <FormItem id="test">
          <div>test</div>
        </FormItem>
      </Form>
    )

    await waitFor(() => {
      expect(container.querySelector(".form")).not.toBeNull();
      expect(container.querySelector(".robin")).not.toBeNull();
      expect(container.querySelector("[title='form']")).not.toBeNull();
      expect(container.querySelector("[alt='image']")).not.toBeNull();
      console.log(container.querySelector("#test"));
      expect(container.querySelector("#test")).not.toBeNull();
    })
  })

})