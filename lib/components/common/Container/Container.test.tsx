import { render, screen } from '@testing-library/react';
import React from 'react';

import Container from './Container';

describe('Container', () => {
  it('should render correctly', () => {
    render(
      <Container
        aria-label='container'
        justify='center'
        display='flex'
        direction='column'
        alignItems='center'
        alignContent='center'
      >
        <p>test</p>
      </Container>
    );

    expect(screen.getByLabelText('container')).toBeTruthy();
  });

  it('should get diferent sizes', () => {
    const { rerender } = render(
      <Container aria-label='container' xs>
        <p>test</p>
      </Container>
    );
    expect(screen.getByLabelText('container')).toHaveClass('xs');
    rerender(
      <Container aria-label='container' sm>
        <p>test</p>
      </Container>
    );
    expect(screen.getByLabelText('container')).toHaveClass('sm');
    rerender(
      <Container aria-label='container' md>
        <p>test</p>
      </Container>
    );
    expect(screen.getByLabelText('container')).toHaveClass('md');
    rerender(
      <Container aria-label='container' lg>
        <p>test</p>
      </Container>
    );
    expect(screen.getByLabelText('container')).toHaveClass('lg');
    rerender(
      <Container aria-label='container' xl>
        <p>test</p>
      </Container>
    );
    expect(screen.getByLabelText('container')).toHaveClass('xl');
  });
});
