import { render, screen } from '@testing-library/react';
import React from 'react';

import Spinner from './Spinner';

describe('<Spinner> test suite', () => {
  it('Should be render correctly', () => {
    render(<Spinner data-testid='svg-element' />);

    expect(screen.getByTestId('svg-element')).toBeTruthy();
  });
});
