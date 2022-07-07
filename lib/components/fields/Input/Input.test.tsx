import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Input from './Input';

describe('<Input/> test suite', () => {
  it('should render correctly', () => {
    const view = render(
      <Input
        inputProps={{
          placeholder: 'placeholder',
        }}
      />
    );

    expect(() => view.unmount()).not.toThrow();
  });

  it('should set input value', async () => {
    render(
      <Input
        inputProps={{
          placeholder: 'placeholder',
          value: 'test',
        }}
      />
    );

    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input.value).toEqual('test');
  });

  it('should trigger event when input changed', async () => {
    let value = '';
    const callback = jest
      .fn()
      .mockImplementation(
        (e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value)
      );

    render(<Input inputProps={{ onChange: callback }} />);
    const input = (await screen.findByRole('textbox')) as HTMLInputElement;

    expect(callback).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(callback).toHaveBeenCalled();
    expect(value).toEqual('test');
  });

  it('should ignore event when input disabled', async () => {
    const callback = jest.fn();
    render(<Input inputProps={{ disabled: true, onChange: callback }} />);
    const input = (await screen.findByRole('textbox')) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should display error when props is passed', async () => {
    render(<Input error='test' inputProps={{}} />);

    expect(await screen.findByText(/test/i)).toBeTruthy();
  });

  it('should add custom input className properly', async () => {
    render(
      <Input
        inputProps={{
          className: 'test',
        }}
      />
    );

    const input = (await screen.findByRole('textbox')) as HTMLInputElement;
    expect(input).toHaveClass('test');
  });
});
