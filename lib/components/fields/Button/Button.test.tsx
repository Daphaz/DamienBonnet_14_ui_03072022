import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Button from './Button';
import { ButtonVariant } from './enums';

describe('<Button/> test suite', () => {
  it('Should be render correctly', () => {
    render(
      <Button type='button' label='test label' data-testid='btn-element' />
    );

    expect(screen.getByTestId('btn-element')).toBeTruthy();

    const span = screen.getByText(/test label/i);
    expect(span.textContent).toBe('test label');
    expect(span.classList.contains('text')).toBeTruthy();
  });

  it('Should be disabled when attribute is set', () => {
    render(<Button type='button' label='test label' disabled />);

    const btn = screen.getByRole<HTMLButtonElement>('button');
    const isDisabled = btn.disabled;
    expect(isDisabled).toBeTruthy();
  });

  it('Should be variant secondary when prop is set', () => {
    render(
      <Button
        type='button'
        label='test label'
        variant={ButtonVariant.Secondary}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('secondary');
  });

  it('Should be borderer when prop is set', () => {
    render(<Button type='button' label='test label' borderer />);
    expect(screen.getByRole('button')).toHaveClass('border');
  });

  it('Should be loading when prop is set', () => {
    render(<Button type='button' label='test label' loading />);
    expect(screen.getByRole('button')).toHaveClass('loading');
  });

  it('handleReady is call when mouse is down', async () => {
    const mockOnMouseDown = jest.fn();
    render(
      <Button type='button' label='test label' onMouseDown={mockOnMouseDown} />
    );

    expect(mockOnMouseDown).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /test label/i }));
    expect(mockOnMouseDown).toHaveBeenCalled();
  });

  it('handlePressed is call when mouse is up or leave', async () => {
    const mockFn = jest.fn();
    render(
      <Button
        type='button'
        label='test label'
        onMouseLeave={mockFn}
        onMouseUp={mockFn}
      />
    );

    expect(mockFn).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /test label/i }));
    expect(mockFn).toHaveBeenCalled();
  });
});
