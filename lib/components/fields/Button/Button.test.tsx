import { render } from '@testing-library/react';
import React from 'react';

import Button from './Button';

describe('Button component', () => {
  it('Should be render', () => {
    render(<Button label='test label' />);
  });
});
