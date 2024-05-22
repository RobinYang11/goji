
// import React from 'react';
import { render } from '@testing-library/react';
import FormTest from '../form';

describe('robin', () => {
  it('render form test', () => {
    const { container } = render(<FormTest />);
  })
})