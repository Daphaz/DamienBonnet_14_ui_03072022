/* istanbul ignore file */
import { useEffect, useState } from 'react';

const createElement = (id: string) => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};

const usePortal = (selectId = 'modal'): HTMLElement | null => {
  const id = `hrnet-${selectId}`;
  const [elSnapShot, setElSnapShot] = useState<HTMLElement | null>(
    createElement(id)
  );

  useEffect(() => {
    const parentElement = document.body;
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }
    setElSnapShot(el);
  }, [id]);

  return elSnapShot;
};

export default usePortal;
