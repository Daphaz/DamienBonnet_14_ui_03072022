import React from 'react';
import { createPortal } from 'react-dom';

import ModalBody from './modal-body';
import { ModalConfig, ModalContext } from './modal-context';
import ModalFooter from './modal-footer';
import ModalHeader from './modal-header';
import ModalWrapper from './modal-wrapper';
import { Backdrop } from '../Backdrop';
import { useBodyScroll, useCurrentState, usePortal } from '../../hooks';

interface Props {
  open?: boolean;
  preventClose?: boolean;
  closeButton?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

const defaultProps = {
  className: '',
  preventClose: false,
  closeButton: false,
};

type NativeAttrs = Omit<React.DialogHTMLAttributes<unknown>, keyof Props>;

export type ModalProps = Props & NativeAttrs;

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  preventClose,
  onClose,
  onOpen,
  open,
  className,
  closeButton,
}) => {
  const portal = usePortal('modal');
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [visible, setVisible, visibleRef] = useCurrentState<boolean>(false);
  const [rebound, setRebound] = React.useState(false);

  const closeModal = () => {
    onClose && onClose();
    setVisible(false);
    setBodyHidden(false);
  };

  React.useEffect(() => {
    if (open === undefined) return;
    if (open) {
      onOpen && onOpen();
    }
    if (!open && visibleRef.current) {
      onClose && onClose();
    }
    setVisible(open);
    setBodyHidden(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggleRebound = () => {
    setRebound(true);
    // istanbul ignore next-line
    const timer = setTimeout(() => {
      setRebound(false);
      clearTimeout(timer);
    }, 300);
  };

  const closeFromBackdrop = () => {
    if (preventClose) {
      toggleRebound();
      return;
    }
    closeModal();
  };

  const modalConfig: ModalConfig = React.useMemo(
    () => ({
      close: closeModal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // istanbul ignore next-line
  if (!portal) return null;

  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Backdrop onClick={closeFromBackdrop} visible={visible}>
        <ModalWrapper
          visible={visible}
          onCloseButtonClick={closeModal}
          className={className}
          rebound={rebound}
          closeButton={closeButton}
        >
          {children}
        </ModalWrapper>
      </Backdrop>
    </ModalContext.Provider>,
    portal
  );
};

type ModalComponent<P = Record<string, unknown>> = React.FC<P> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

Modal.defaultProps = defaultProps;

export default Modal as ModalComponent<ModalProps>;
