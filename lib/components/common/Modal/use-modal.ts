import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { useCurrentState } from '../../hooks';

const useModal = (
  initialValue = false
): {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentRef: MutableRefObject<boolean>;
  controls: {
    open: boolean;
    onClose: () => void;
  };
} => {
  const [visible, setVisible, currentRef] =
    useCurrentState<boolean>(initialValue);

  return {
    visible,
    setVisible,
    currentRef,
    controls: {
      open: visible,
      onClose: () => setVisible(false),
    },
  };
};

export default useModal;
