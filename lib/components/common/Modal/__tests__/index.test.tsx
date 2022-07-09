import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Modal from '../index';

describe('Modal', () => {
  it('should render correctly', () => {
    render(
      <Modal open={true}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <p>content of the body</p>
        </Modal.Body>
        <Modal.Footer>Submit</Modal.Footer>
      </Modal>
    );

    expect(screen.getByText(/Submit/i)).toBeTruthy();
  });

  it('should trigger when modal changed', async () => {
    const openHandler = jest.fn();
    const closeHandler = jest.fn();

    const { rerender } = render(
      <Modal onOpen={openHandler} onClose={closeHandler}>
        <p>test modal</p>
      </Modal>
    );

    expect(screen.queryByTestId('backdrop-content')).not.toBeInTheDocument();
    rerender(
      <Modal open onOpen={openHandler} onClose={closeHandler}>
        <p>test modal</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(openHandler).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('backdrop'));
    await waitFor(
      () => {
        expect(closeHandler).toHaveBeenCalled();
      },
      {
        timeout: 400,
      }
    );
  });

  it('should disable backdrop event', async () => {
    const closeHandler = jest.fn();
    render(
      <Modal open preventClose onClose={closeHandler}>
        <p>test modal</p>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('backdrop-content'));
    await waitFor(
      () => {
        expect(closeHandler).not.toHaveBeenCalled();
      },
      {
        timeout: 400,
      }
    );
    fireEvent.click(screen.getByTestId('backdrop'));
    await waitFor(
      () => {
        expect(closeHandler).not.toHaveBeenCalled();
      },
      {
        timeout: 500,
      }
    );
  });

  it('should be supported customisation', () => {
    render(
      <Modal open className='modal-test'>
        <Modal.Header
          aria-label='modal-header'
          className='modal-header'
          justify='center'
        >
          title
        </Modal.Header>
        <Modal.Body
          aria-label='modal-body'
          className='modal-body'
          justify='center'
        >
          body
        </Modal.Body>
        <Modal.Footer
          aria-label='modal-footer'
          className='modal-footer'
          justify='center'
        >
          footer
        </Modal.Footer>
      </Modal>
    );

    const html = screen.getByRole('dialog');
    expect(html).toHaveClass('modal-test');
    expect(screen.getByLabelText(/modal-header/i)).toBeTruthy();
    expect(screen.getByLabelText(/modal-body/i)).toBeTruthy();
    expect(screen.getByLabelText(/modal-footer/i)).toBeTruthy();
  });

  it('should have close button and close the modal when is trigger', async () => {
    const closeHandler = jest.fn();
    render(
      <Modal open preventClose closeButton onClose={closeHandler}>
        <p>test modal</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('close-modal'));
    expect(closeHandler).toHaveBeenCalled();
    await waitFor(
      () => {
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
      },
      { timeout: 400 }
    );
  });

  it('should trigger rebound when preserveClose is set', async () => {
    const closeHandler = jest.fn();
    render(
      <Modal open preventClose closeButton onClose={closeHandler}>
        <p>test modal</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('backdrop'));

    await waitFor(
      () => {
        expect(closeHandler).not.toHaveBeenCalled();
      },
      { timeout: 400 }
    );
  });
});
