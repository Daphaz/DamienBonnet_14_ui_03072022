/* istanbul ignore file */
import Modal from './Modal';
import ModalBody from './modal-body';
import ModalFooter from './modal-footer';
import ModalHeader from './modal-header';

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export type { ModalProps } from './Modal';
export type { ModalBodyProps } from './modal-body';
export { useModalContext } from './modal-context';
export type { ModalFooterProps } from './modal-footer';
export type { ModalHeaderProps } from './modal-header';
export { default as useModal } from './use-modal';

export default Modal;
