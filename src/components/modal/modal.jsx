import React, {useEffect, useMemo} from 'react';
import styles from './modal.module.css'
import cn from "classnames";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');
const Modal = ({children, setActive}) => {
  const element = useMemo(() => document.createElement('div'), []);
  const closePopup = (e) => {
    if(e.key === 'Escape') {
      setActive(false);
      document.removeEventListener('keydown', (closePopup))
    }
  }
  useEffect(() => {
    modalRoot.appendChild(element)
    document.addEventListener('keydown', (closePopup))
  return () => {
    modalRoot.removeChild(element);
  }

  }, [])
  return createPortal(
    <>
      <div className={cn(styles.modal)}>
        {children}
      </div>
      <ModalOverlay setActive={setActive}/>
    </>, element
  );
};
Modal.propTypes = {
  children: PropTypes.element,
  setActive: PropTypes.func
}
export default Modal;


