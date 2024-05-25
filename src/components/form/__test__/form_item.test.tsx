import { render } from '@testing-library/react';
import FormItem from '../FormItem';
import Form from '../Form';
import { waitFor } from './form_instance.test';

describe("Form", () => {

  test('Basic Html attributes tests', async () => {
    const { container } = render(
      <Form className='form' title='form'>
        <FormItem className="robin" name="name">
          <input />
        </FormItem>
        <FormItem>
          <img alt="image" src="test" />
        </FormItem>
        <FormItem id="test">
          <div>test no name attributes</div>
        </FormItem>
        <FormItem style={{ height: "300", background: "red" }}>
          <div>test style</div>
        </FormItem>
      </Form>
    )

    await waitFor(() => {
      //test css class attribute
      expect(container.querySelector(".form")).not.toBeNull();
      expect(container.querySelector(".robin")).not.toBeNull();
      // test title attribute
      expect(container.querySelector("[title='form']")).not.toBeNull();
      // test alt attribute
      expect(container.querySelector("[alt='image']")).not.toBeNull();
      // test id attribute
      expect(container.querySelector("#test")).not.toBeNull();
      
      //test style attribute
      const ele = container.querySelector("#ele");
      expect(ele?.getAttribute("style")).not.toBeNull();

    })
  })


  test("test FormItem with no parent element Form", () => {

    const { container } = render(
      <div>
        <FormItem name="robin">
          <div className='ele1'>test no parent form</div>
        </FormItem>
        <FormItem className="ele2" style={{ color: "red" }}>
          <div >test no any attribute</div>
        </FormItem>
      </div>
    )
    expect(container).not.toBeNull();
    expect(container.querySelector(".ele1")).not.toBeNull();
    const ele2 = container.querySelector(".ele2")
    expect(ele2).not.toBeNull();
    expect(ele2?.getAttribute("style")).not.toBeNull();

  })

})