import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Dropdown from './Dropdown';

const mockOptions = [{ label: 'test', value: 'test' }];

describe('<Dropdown/> test suite', () => {
  it('should render correctly', () => {
    const view = render(
      <Dropdown options={mockOptions} placeholder='placeholder' />
    );

    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(() => view.unmount()).not.toThrow();
  });

  it('should render icon-check when listem is selected', () => {
    render(<Dropdown options={mockOptions} placeholder='placeholder' />);

    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    const li = screen.getByRole('listitem');
    fireEvent.click(li);
    fireEvent.click(btn);

    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('should open menu when button is clicked', () => {
    render(<Dropdown options={mockOptions} placeholder='placeholder' />);

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('should close menu when button is clicked a second time', () => {
    render(<Dropdown options={mockOptions} placeholder='placeholder' />);

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(screen.getByRole('list')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('should close menu when a listitem is clicked', () => {
    render(<Dropdown options={mockOptions} placeholder='placeholder' />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    const li = screen.getByRole('listitem');
    expect(li.textContent).toEqual('test');
    fireEvent.click(li);
    expect(screen.queryByRole('listitem')).toBeNull();
  });

  it('should close menu when is clicked outside the component', () => {
    const { container } = render(
      <Dropdown options={mockOptions} placeholder='placeholder' />
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByRole('list')).toBeInTheDocument();
    fireEvent.click(container);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('should trigger onChange when listitem is clicked', () => {
    const callback = jest.fn().mockImplementation(() => 'test');

    render(
      <Dropdown
        options={mockOptions}
        placeholder='placeholder'
        onChange={callback}
      />
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    const li = screen.getByRole('listitem');

    expect(callback).not.toHaveBeenCalled();
    fireEvent.click(li);
    expect(callback).toHaveBeenCalled();
    expect(screen.getByText(/test/i)).toBeTruthy();
  });
});
