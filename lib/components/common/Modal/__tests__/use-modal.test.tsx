import { render, screen, waitFor } from '@testing-library/react';
import React, { useEffect } from 'react';

import Modal from '../index';
import useModal from '../use-modal';

describe('useModal', () => {
  it('should follow change with use-modal', async () => {
    const MockModal: React.FC<{ show: boolean }> = ({ show }) => {
      const { setVisible, controls } = useModal();

      useEffect(() => {
        if (show !== undefined) setVisible(show);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [show]);

      return (
        <Modal {...controls}>
          <Modal.Header>Title</Modal.Header>
        </Modal>
      );
    };

    const { rerender } = render(<MockModal show />);
    await waitFor(() => {
      expect(screen.getByText('Title')).toBeVisible();
    });

    rerender(<MockModal show={false} />);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
