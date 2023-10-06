import React, {useEffect, useMemo} from 'react';
import styles from './modal.module.css'
import cn from "classnames";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.querySelector('#modal-root');
const Modal = ({children, setActive}) => {
  const element = useMemo(() => document.createElement('div'), []);

  const closePopup = () => {
    setActive(false)
  }

  useEffect(() => {
    const closePopupByEscape = (e) => {
      if(e.key === 'Escape') {
        closePopup();
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
        <div className={cn(styles.modal__closeIcon)}>
          <CloseIcon type="primary" onClick={() => {closePopup()}}/>
        </div>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </>, element
  );
};
Modal.propTypes = {
  children: PropTypes.element,
  setActive: PropTypes.func
}
export default Modal;


