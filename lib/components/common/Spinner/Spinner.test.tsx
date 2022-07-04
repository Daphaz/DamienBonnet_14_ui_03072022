import React from 'react';
import { render, screen } from '@testing-library/react';

import Spinner from './Spinner';

describe('<Spinner> test suite', () => {
  it('Should be render correctly', () => {
    const { getByTestId, baseElement } = render(
      <Spinner data-testid='svg-element' />
    );

    expect(getByTestId('svg-element')).toBeTruthy();

    const circle = baseElement.querySelector('circle');
    expect(circle).toHaveClass('spinPath');
  });
});
