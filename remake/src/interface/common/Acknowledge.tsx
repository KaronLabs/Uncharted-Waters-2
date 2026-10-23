/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useRef } from 'react';
import { isInteractiveTextTarget } from '../../localization/dom';
import Input from '../../input';
import { t } from '../../localization';

interface Props {
  onAcknowledge: (() => void) | undefined;
}

export default function Acknowledge({ onAcknowledge }: Props) {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const area = button.current?.closest('[data-acknowledge-area]');
    if (!area || !onAcknowledge) return undefined;

    const advance = (event: Event) => {
      if (Input.isSuspended('overlay')) return;
      const { target } = event;
      if (!(target instanceof Element)) return;
      if (target.closest('button, input, select, [role="button"]')) return;
      const scroll = target.closest<HTMLElement>('[data-dialogue-scroll]');
      if (scroll && scroll.scrollHeight > scroll.clientHeight) return;
      event.preventDefault();
      onAcknowledge();
    };

    area.addEventListener('click', advance);
    area.addEventListener('contextmenu', advance);
    return () => {
      area.removeEventListener('click', advance);
      area.removeEventListener('contextmenu', advance);
    };
  }, [onAcknowledge]);

  useEffect(() => {
    if (!onAcknowledge) {
      return undefined;
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (Input.isSuspended('overlay')) return;
      if (isInteractiveTextTarget(e.target)) return;
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape'].includes(pressedKey)) {
        e.preventDefault();
        onAcknowledge();
      }
    };

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  });

  if (!onAcknowledge) {
    return null;
  }

  const onClickOrContextMenu = () => {
    if (Input.isSuspended('overlay')) return;
    onAcknowledge();
  };

  return (
    <button
      ref={button}
      type="button"
      className="absolute bottom-4 right-4 z-20 rounded border-2 border-[#d4a742] bg-[#2c1a0e] px-4 py-2 text-lg text-white"
      data-acknowledge-continue
      onClick={onClickOrContextMenu}
      onContextMenu={onClickOrContextMenu}
    >
      {t('Continue')}
    </button>
  );
}
