import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';
import { ButtonVariant } from './enums';

describe('<Button/> test suite', () => {
  it('Should be render correctly', () => {
    const { getByTestId, container } = render(
      <Button label='test label' data-testid='btn-element' />
    );

    expect(getByTestId('btn-element')).toBeTruthy();

    const span = container.querySelector('span');
    expect(span?.textContent).toBe('test label');
    expect(span?.classList.contains('text')).toBeTruthy();
  });

  it('Should be disabled when attribute is set', () => {
    const { container } = render(<Button label='test label' disabled />);

    const btn = container.querySelector('button');
    const isDisabled = btn?.disabled;
    expect(isDisabled).toBeTruthy();
  });

  it('Should be variant secondary when prop is set', () => {
    const { container } = render(
      <Button label='test label' variant={ButtonVariant.Secondary} />
    );

    const btn = container.querySelector('button');
    expect(btn?.classList.contains('secondary')).toBeTruthy();
  });

  it('Should be borderer when prop is set', () => {
    const { container } = render(<Button label='test label' borderer />);

    const btn = container.querySelector('button');
    expect(btn?.classList.contains('border')).toBeTruthy();
  });

  it('Should be loading when prop is set', () => {
    const { container, asFragment } = render(
      <Button label='test label' loading />
    );

    const btn = container.querySelector('button');
    expect(btn).toHaveClass('loading');
  });

  it('handleReady is call when mouse is down', async () => {
    const mockOnMouseDown = jest.fn();
    render(<Button label='test label' onMouseDown={mockOnMouseDown} />);

    expect(mockOnMouseDown).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /test label/i }));
    expect(mockOnMouseDown).toHaveBeenCalled();
  });

  it('handlePressed is call when mouse is up or leave', async () => {
    const mockFn = jest.fn();
    render(
      <Button label='test label' onMouseLeave={mockFn} onMouseUp={mockFn} />
    );

    expect(mockFn).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /test label/i }));
    expect(mockFn).toHaveBeenCalled();
  });
});
