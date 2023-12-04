import React, {FC, useEffect, useMemo} from 'react';
import styles from './modal.module.css'
import cn from "classnames";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation} from "react-router-dom";

const modalRoot = document.querySelector('#modal-root') as HTMLElement;
interface IProps {
  children: React.ReactNode,
  closePopup: (path: string) => void
}
const Modal:FC<IProps> = ({children, closePopup}) => {
  const element = useMemo(() => document.createElement('div'), []);
  const location = useLocation();
  useEffect(() => {
    const closePopupByEscape = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        closePopup(location.pathname);
      }
    }
    modalRoot.appendChild(element)
    document.addEventListener('keydown', (closePopupByEscape))
  return () => {
    modalRoot.removeChild(element);
    document.removeEventListener('keydown', (closePopupByEscape));
  }

  }, [])
  return createPortal(
    <>
      <div className={cn(styles.modal)}>
        <div className={cn(styles.modal__closeIcon)} data-cy="close-icon-popup">
          <CloseIcon type="primary" onClick={() => closePopup(location.pathname)}/>
        </div>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </>, element
  );
};

export default Modal;


